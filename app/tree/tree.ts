export interface TreeNode {
  name: string;
  children: TreeNode[];
}

export interface Settings {
  showRoot: boolean;
  trailingSlash: boolean;
  fullPath: boolean;
  colors: boolean;
  backwardSlash: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
  showRoot: true,
  trailingSlash: true,
  fullPath: false,
  colors: false,
  backwardSlash: false,
};

export const EXAMPLE_INPUT = `my-awesome-project
  src
    components
      Button.tsx
      Modal.tsx
    hooks
      useTheme.ts
      useMagic.ts
    utils
      helpers.ts
  public
    favicon.ico
    robots.txt
  package.json
  README.md
  .gitignore`;

const SETTINGS_STORAGE_KEY = "tree-generator-settings";

export function parseInput(input: string): TreeNode[] {
  const lines = input.split("\n").filter((line) => line.trim());
  const root: TreeNode[] = [];
  const stack: { node: TreeNode; indent: number }[] = [];

  for (const line of lines) {
    // Count leading whitespace (tabs count as 4 spaces)
    let indent = 0;
    for (const char of line) {
      if (char === "\t") {
        indent += 4;
      } else if (char === " ") {
        indent += 1;
      } else {
        break;
      }
    }
    const name = line.trim();

    if (!name) continue;

    const newNode: TreeNode = { name, children: [] };

    // Pop stack until we find a parent with less indentation
    while (stack.length > 0 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }

    if (stack.length === 0) {
      root.push(newNode);
    } else {
      stack[stack.length - 1].node.children.push(newNode);
    }

    stack.push({ node: newNode, indent });
  }

  return root;
}

export function beautifyInput(input: string): string {
  const nodes = parseInput(input);

  function renderNodes(nodes: TreeNode[], depth: number): string[] {
    const lines: string[] = [];
    for (const node of nodes) {
      const indent = "  ".repeat(depth);
      lines.push(indent + node.name);
      if (node.children.length > 0) {
        lines.push(...renderNodes(node.children, depth + 1));
      }
    }
    return lines;
  }

  return renderNodes(nodes, 0).join("\n");
}

export function renderTree(
  nodes: TreeNode[],
  prefix: string = "",
  settings: Settings,
  pathPrefix: string = "",
  isTopLevel: boolean = false,
): string[] {
  const lines: string[] = [];
  const slash = settings.backwardSlash ? "\\" : "/";

  nodes.forEach((node, index) => {
    const isLast = index === nodes.length - 1;
    const isFolder = node.children.length > 0;
    const displayName =
      isFolder && settings.trailingSlash ? node.name + slash : node.name;
    const fullPath = pathPrefix
      ? `${pathPrefix}${slash}${node.name}`
      : node.name;
    const nameToShow = settings.fullPath
      ? isFolder && settings.trailingSlash
        ? fullPath + slash
        : fullPath
      : displayName;

    if (isTopLevel && !settings.showRoot) {
      // No connector for top-level items when root is hidden
      lines.push(nameToShow);
      if (node.children.length > 0) {
        lines.push(...renderTree(node.children, "", settings, fullPath, false));
      }
    } else {
      const connector = isLast ? "└── " : "├── ";
      const childPrefix = isLast ? "    " : "│   ";
      lines.push(prefix + connector + nameToShow);
      if (node.children.length > 0) {
        lines.push(
          ...renderTree(
            node.children,
            prefix + childPrefix,
            settings,
            fullPath,
            false,
          ),
        );
      }
    }
  });

  return lines;
}

export function generateAsciiTree(input: string, settings: Settings): string {
  const nodes = parseInput(input);
  if (nodes.length === 0) return settings.showRoot ? "." : "";

  const lines: string[] = [];
  if (settings.showRoot) {
    lines.push(".");
  }
  lines.push(...renderTree(nodes, "", settings, "", true));
  return lines.join("\n");
}

export function encodeSettings(settings: Settings): string {
  const flags =
    (settings.showRoot ? 1 : 0) |
    (settings.trailingSlash ? 2 : 0) |
    (settings.fullPath ? 4 : 0) |
    (settings.colors ? 8 : 0) |
    (settings.backwardSlash ? 16 : 0);
  return flags.toString();
}

export function decodeSettings(encoded: string): Settings | null {
  const flags = parseInt(encoded, 10);
  if (isNaN(flags)) return null;
  return {
    showRoot: (flags & 1) !== 0,
    trailingSlash: (flags & 2) !== 0,
    fullPath: (flags & 4) !== 0,
    colors: (flags & 8) !== 0,
    backwardSlash: (flags & 16) !== 0,
  };
}

export function loadSettingsFromStorage(): Settings | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // Ignore
  }
  return null;
}

export function saveSettingsToStorage(settings: Settings): void {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Ignore
  }
}

export function encodeInput(input: string): string {
  return btoa(encodeURIComponent(input));
}

export function decodeInput(encoded: string): string | null {
  try {
    return decodeURIComponent(atob(encoded));
  } catch {
    return null;
  }
}
