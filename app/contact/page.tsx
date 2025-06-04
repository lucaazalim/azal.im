export default function Page() {
  return (
    <div className="flex h-[calc(100vh-var(--navbar-height))] flex-col justify-center p-10 text-center">
      <h1 className="text-2xl font-black">
        I'm gonna build something fun here soon!
      </h1>
      <p className="text-foreground/50 mt-4 text-xl">
        For now, shoot me an email at{" "}
        <a
          className="text-primary underline"
          href="mailto:luca@azal.im"
          target="_blank"
          rel="noopener noreferrer"
        >
          luca@azal.im
        </a>
      </p>
    </div>
  );
}
