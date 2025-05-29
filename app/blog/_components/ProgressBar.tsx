"use client";

import { useEffect, useState } from "react";

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const windowHeight = scrollHeight - clientHeight;
      const scrollProgress = scrollTop / windowHeight;

      // Ensure progress is between 0 and 1
      const boundedProgress = Math.max(0, Math.min(1, scrollProgress));
      setProgress(boundedProgress);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Call once to set initial progress
    handleScroll();

    // Clean up event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-[var(--navbar-height)] left-0 z-50 h-1 w-full">
      <div
        className="bg-primary h-full transition-all duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
        role="progressbar"
        aria-valuenow={progress * 100}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}
