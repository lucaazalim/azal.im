"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { Switch } from "@/app/_components/ui/switch";
import {
  Check,
  Copy,
  Download,
  Settings,
  Share2,
  Sparkles,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  beautifyInput,
  decodeInput,
  decodeSettings,
  DEFAULT_SETTINGS,
  encodeInput,
  encodeSettings,
  EXAMPLE_INPUT,
  generateAsciiTree,
  loadSettingsFromStorage,
  saveSettingsToStorage,
} from "./tree";

const MENLO_FONT = { fontFamily: "Menlo, Monaco, 'Courier New', monospace" };

export default function TreePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);

  const [input, setInput] = useState(() => {
    const encoded = searchParams.get("t");
    if (encoded) {
      const decoded = decodeInput(encoded);
      if (decoded) return decoded;
    }
    return EXAMPLE_INPUT;
  });

  const [settings, setSettings] = useState<Settings>(() => {
    // URL takes priority (works on both server and client)
    const urlSettings = searchParams.get("s");
    if (urlSettings) {
      const decoded = decodeSettings(urlSettings);
      if (decoded) return decoded;
    }
    // Return defaults for initial render, localStorage will be checked in useEffect
    return DEFAULT_SETTINGS;
  });

  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const lineNumbers = useMemo(() => {
    const lines = input.split("\n");
    return lines.map((_, i) => <div key={i}>{i + 1}</div>);
  }, [input]);

  // Hydrate settings from localStorage after mount (only if not provided in URL)
  useEffect(() => {
    const urlSettings = searchParams.get("s");
    if (!urlSettings) {
      const stored = loadSettingsFromStorage();
      if (stored) {
        setSettings(stored);
      }
    }
    setIsHydrated(true);
  }, [searchParams]);

  // Save settings to localStorage when they change
  useEffect(() => {
    if (isHydrated) {
      saveSettingsToStorage(settings);
    }
  }, [settings, isHydrated]);

  // Keep URL in sync with input and settings
  useEffect(() => {
    if (!isHydrated) return;
    const encoded = encodeInput(input);
    const settingsEncoded = encodeSettings(settings);
    const newUrl = `${window.location.pathname}?t=${encoded}&s=${settingsEncoded}`;
    router.replace(newUrl, { scroll: false });
  }, [input, settings, router, isHydrated]);

  const asciiTree = useMemo(() => {
    return generateAsciiTree(input, settings);
  }, [input, settings]);

  const renderColoredTree = (tree: string) => {
    if (!settings.colors) {
      return tree;
    }

    // Split into characters and colorize tree characters and slashes
    const treeChars = /[├└│─/\\]/g;
    const parts = tree.split(treeChars);
    const matches = tree.match(treeChars) || [];

    const result: React.ReactNode[] = [];
    parts.forEach((part, i) => {
      result.push(part);
      if (matches[i]) {
        result.push(
          <span key={i} className="text-primary">
            {matches[i]}
          </span>,
        );
      }
    });

    return result;
  };

  return (
    <div className="flex h-[calc(100vh-var(--navbar-height))] w-full flex-col lg:flex-row">
      {/* Left Column - Input */}
      <div className="flex h-1/2 w-full flex-col border-b border-neutral-700 lg:h-full lg:w-1/2 lg:border-r lg:border-b-0">
        <div className="flex h-10 items-center justify-between border-b border-neutral-700 bg-neutral-900">
          <span className="px-4 text-sm text-neutral-400" style={MENLO_FONT}>
            Input (indent with spaces)
          </span>
          <button
            onClick={() => setInput(beautifyInput(input))}
            className="flex h-full w-10 items-center justify-center gap-2 border-l border-neutral-700 text-sm text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-200 lg:w-28"
            style={MENLO_FONT}
          >
            <Sparkles className="h-4 w-4" />
            <span className="hidden lg:inline">Beautify</span>
          </button>
        </div>
        <div className="relative flex h-full w-full overflow-hidden">
          <div
            ref={lineNumbersRef}
            className="pointer-events-none flex-shrink-0 overflow-hidden bg-neutral-900 py-4 pr-2 pl-4 text-right text-sm text-neutral-600 select-none"
            style={MENLO_FONT}
            aria-hidden="true"
          >
            {lineNumbers}
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onScroll={(e) => {
              if (lineNumbersRef.current) {
                lineNumbersRef.current.scrollTop = e.currentTarget.scrollTop;
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Tab") {
                e.preventDefault();
                const target = e.target as HTMLTextAreaElement;
                const start = target.selectionStart;
                const end = target.selectionEnd;
                const newValue =
                  input.substring(0, start) + "  " + input.substring(end);
                setInput(newValue);
                // Set cursor position after the spaces
                requestAnimationFrame(() => {
                  target.selectionStart = target.selectionEnd = start + 2;
                });
              }
            }}
            className="h-full w-full resize-none overflow-auto bg-black py-4 pr-4 pl-3 text-sm whitespace-pre text-neutral-200 outline-none placeholder:text-neutral-600"
            style={MENLO_FONT}
            wrap="off"
            placeholder="Enter file names..."
            spellCheck={false}
          />
        </div>
      </div>

      {/* Right Column - Output */}
      <div className="flex h-1/2 w-full flex-col lg:h-full lg:w-1/2">
        <div className="flex h-10 items-center justify-between border-b border-neutral-700 bg-neutral-900">
          <span className="px-4 text-sm text-neutral-400" style={MENLO_FONT}>
            ASCII Tree Output
          </span>
          <div className="flex h-full">
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className="flex h-full w-10 items-center justify-center gap-2 border-l border-neutral-700 text-sm text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-200 lg:w-28"
                  style={MENLO_FONT}
                >
                  <Settings className="h-4 w-4" />
                  <span className="hidden lg:inline">Settings</span>
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-64 border-neutral-700 bg-neutral-900 p-0"
                align="end"
              >
                <div className="flex flex-col">
                  <label className="flex items-center justify-between border-b border-neutral-700 px-4 py-3">
                    <span
                      className="text-sm text-neutral-200"
                      style={MENLO_FONT}
                    >
                      Show root
                    </span>
                    <Switch
                      checked={settings.showRoot}
                      onCheckedChange={(checked) =>
                        setSettings((s) => ({ ...s, showRoot: checked }))
                      }
                    />
                  </label>
                  <label className="flex items-center justify-between border-b border-neutral-700 px-4 py-3">
                    <span
                      className="text-sm text-neutral-200"
                      style={MENLO_FONT}
                    >
                      Trailing /
                    </span>
                    <Switch
                      checked={settings.trailingSlash}
                      onCheckedChange={(checked) =>
                        setSettings((s) => ({ ...s, trailingSlash: checked }))
                      }
                    />
                  </label>
                  <label className="flex items-center justify-between border-b border-neutral-700 px-4 py-3">
                    <span
                      className="text-sm text-neutral-200"
                      style={MENLO_FONT}
                    >
                      Backward \
                    </span>
                    <Switch
                      checked={settings.backwardSlash}
                      onCheckedChange={(checked) =>
                        setSettings((s) => ({ ...s, backwardSlash: checked }))
                      }
                    />
                  </label>
                  <label className="flex items-center justify-between border-b border-neutral-700 px-4 py-3">
                    <span
                      className="text-sm text-neutral-200"
                      style={MENLO_FONT}
                    >
                      Full path
                    </span>
                    <Switch
                      checked={settings.fullPath}
                      onCheckedChange={(checked) =>
                        setSettings((s) => ({ ...s, fullPath: checked }))
                      }
                    />
                  </label>
                  <label className="flex items-center justify-between px-4 py-3">
                    <span
                      className="text-sm text-neutral-200"
                      style={MENLO_FONT}
                    >
                      Colors
                    </span>
                    <Switch
                      checked={settings.colors}
                      onCheckedChange={(checked) =>
                        setSettings((s) => ({ ...s, colors: checked }))
                      }
                    />
                  </label>
                </div>
              </PopoverContent>
            </Popover>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setShared(true);
                setTimeout(() => setShared(false), 2000);
              }}
              className="flex h-full w-10 items-center justify-center gap-2 border-l border-neutral-700 text-sm text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-200 lg:w-28"
              style={MENLO_FONT}
            >
              {shared ? (
                <>
                  <Check className="h-4 w-4" />
                  <span className="hidden lg:inline">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4" />
                  <span className="hidden lg:inline">Share</span>
                </>
              )}
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(asciiTree);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="flex h-full w-10 items-center justify-center gap-2 border-l border-neutral-700 text-sm text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-200 lg:w-28"
              style={MENLO_FONT}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  <span className="hidden lg:inline">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span className="hidden lg:inline">Copy</span>
                </>
              )}
            </button>
            <button
              onClick={() => {
                const blob = new Blob([asciiTree], { type: "text/plain" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "tree.txt";
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="flex h-full w-10 items-center justify-center gap-2 border-l border-neutral-700 text-sm text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-200 lg:w-28"
              style={MENLO_FONT}
            >
              <Download className="h-4 w-4" />
              <span className="hidden lg:inline">.txt</span>
            </button>
          </div>
        </div>
        <pre
          className="h-full w-full overflow-auto bg-neutral-950 p-4 text-sm text-neutral-200"
          style={MENLO_FONT}
        >
          {renderColoredTree(asciiTree)}
        </pre>
      </div>
    </div>
  );
}
