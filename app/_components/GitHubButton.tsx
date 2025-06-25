"use client";

import GitHubButton from "react-github-btn";

export default function GitHubButtons() {
  return (
    <>
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
    </>
  );
}
