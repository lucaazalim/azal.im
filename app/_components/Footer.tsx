import GitHubStarButton from "./GitHubButton";

export default function Footer() {
  return (
    <footer className="bg-background flex h-20 items-center justify-center border-t">
      <div className="space-x-2">
        <GitHubStarButton />
      </div>
    </footer>
  );
}
