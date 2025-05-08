"use client";

import GitHubButton from "react-github-btn";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-2">
      <p className="text-foreground-muted">
        Inspired by{" "}
        <a className="link" href="https://brittanychiang.com/">
          Brittany Chiang's site
        </a>
        .
      </p>
      <div className="space-x-2">
        <GitHubButton
          href="https://github.com/lucaazalim/azal.im"
          data-color-scheme="no-preference: dark; light: light; dark: dark;"
          data-icon="octicon-star"
          data-size="large"
          data-show-count="true"
          aria-label="Star lucaazalim/azal.im on GitHub"
        >
          Star
        </GitHubButton>
        <GitHubButton
          href="https://github.com/lucaazalim/azal.im/fork"
          data-color-scheme="no-preference: dark; light: light; dark: dark;"
          data-icon="octicon-repo-forked"
          data-size="large"
          data-show-count="true"
          aria-label="Fork lucaazalim/azal.im on GitHub"
        >
          Fork
        </GitHubButton>
      </div>
    </footer>
  );
}
