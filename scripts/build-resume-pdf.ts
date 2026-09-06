/**
 * Renders the resume page to `public/resume/<RESUME_PDF_FILENAME>` using a
 * headless Chrome/Chromium installed on this machine.
 *
 * Usage: `npm run resume:pdf` (runs `next build` first, then this script).
 * Set `CHROME_PATH` to point at a specific browser binary if auto-detection
 * fails.
 */
import { ROUTES } from "@/lib/constants";
import { execFile, spawn } from "node:child_process";
import { existsSync, mkdtempSync, rmSync, statSync } from "node:fs";
import { createServer } from "node:net";
import os from "node:os";
import path from "node:path";
import { promisify, styleText } from "node:util";

const execFileAsync = promisify(execFile);

const OUTPUT_PATH = path.join(process.cwd(), "public", ROUTES.resumePdf);
const NEXT_BIN = path.join(process.cwd(), "node_modules", ".bin", "next");
const SERVER_TIMEOUT_MS = 60_000;

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter((candidate): candidate is string => Boolean(candidate));

function findChrome(): string {
  const chrome = CHROME_CANDIDATES.find((candidate) => existsSync(candidate));

  if (!chrome) {
    throw new Error(
      "Could not find Chrome or Chromium. Set CHROME_PATH to the browser binary.",
    );
  }

  return chrome;
}

function getFreePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.unref();
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (!address || typeof address === "string") {
        reject(new Error("Could not allocate a port"));
        return;
      }
      server.close(() => resolve(address.port));
    });
  });
}

async function waitForServer(url: string): Promise<void> {
  const deadline = Date.now() + SERVER_TIMEOUT_MS;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch {
      // Server not up yet.
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error(`Timed out waiting for ${url}`);
}

async function main() {
  if (!existsSync(path.join(process.cwd(), ".next"))) {
    throw new Error("No production build found. Run `npm run build` first.");
  }

  const chrome = findChrome();
  const port = await getFreePort();
  const url = `http://127.0.0.1:${port}${ROUTES.resume}`;

  console.log(styleText("dim", `Starting production server on port ${port}…`));

  const server = spawn(NEXT_BIN, ["start", "-p", String(port)], {
    stdio: "ignore",
    detached: true,
  });

  const userDataDir = mkdtempSync(path.join(os.tmpdir(), "azalim-resume-"));

  try {
    await waitForServer(url);

    console.log(styleText("dim", `Printing ${url} with ${chrome}…`));

    await execFileAsync(chrome, [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--no-first-run",
      "--no-default-browser-check",
      `--user-data-dir=${userDataDir}`,
      "--run-all-compositor-stages-before-draw",
      "--virtual-time-budget=10000",
      "--no-pdf-header-footer",
      `--print-to-pdf=${OUTPUT_PATH}`,
      url,
    ]);

    const size = (statSync(OUTPUT_PATH).size / 1024).toFixed(1);
    console.log(
      styleText(
        "green",
        `✔ Wrote ${path.relative(process.cwd(), OUTPUT_PATH)} (${size} KB)`,
      ),
    );
  } finally {
    if (server.pid) {
      try {
        process.kill(-server.pid, "SIGTERM");
      } catch {
        server.kill("SIGTERM");
      }
    }

    rmSync(userDataDir, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(
    styleText("red", `✖ ${error instanceof Error ? error.message : error}`),
  );
  process.exit(1);
});
