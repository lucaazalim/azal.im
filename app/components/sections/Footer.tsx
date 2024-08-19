import GitHubButton from "react-github-btn";

export default function Footer() {
    return (
        <footer className="flex flex-row justify-center lg:justify-end gap-2">
            <GitHubButton href="https://github.com/lucaazalim/azal.im"
                          data-color-scheme="no-preference: dark; light: light; dark: dark;" data-icon="octicon-star"
                          data-size="large" data-show-count="true" aria-label="Star lucaazalim/azal.im on GitHub">
                Star
            </GitHubButton>
            <GitHubButton href="https://github.com/lucaazalim/azal.im/fork"
                          data-color-scheme="no-preference: dark; light: light; dark: dark;"
                          data-icon="octicon-repo-forked" data-size="large" data-show-count="true"
                          aria-label="Fork lucaazalim/azal.im on GitHub">
                Fork
            </GitHubButton>
        </footer>
    );
}