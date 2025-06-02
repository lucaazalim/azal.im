export default function NotFound() {
  return (
    <div className="flex h-[calc(100vh-var(--navbar-height))] flex-col justify-center p-10 text-center">
      <h1 className="text-4xl font-black md:text-8xl">You seem lost!</h1>
      <p className="text-foreground/50 mt-4 text-xl">
        The page you are looking for does not exist or has been moved.
      </p>
    </div>
  );
}
