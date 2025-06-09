"use client";

import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

interface CountUpProps {
  to: number;
  from?: number;
  direction?: "up" | "down";
  delay?: number;
  duration?: number;
  className?: string;
  startWhen?: boolean;
  separator?: string;
  onStart?: () => void;
  onEnd?: () => void;
}

export default function CountUp({
  to,
  from = 0,
  direction = "up",
  delay = 0,
  duration = 2, // Duration of the animation in seconds
  className = "",
  startWhen = true,
  separator = "",
  onStart,
  onEnd,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? to : from);

  // Calculate initial display value to prevent layout shift
  const getFormattedNumber = (value: number) => {
    const options = {
      useGrouping: !!separator,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    };

    const formattedNumber = Intl.NumberFormat("en-US", options).format(value);
    return separator
      ? formattedNumber.replace(/,/g, separator)
      : formattedNumber;
  };

  const initialValue = direction === "down" ? to : from;
  const initialDisplayValue = getFormattedNumber(initialValue);

  // Calculate damping and stiffness based on duration
  const damping = 20 + 40 * (1 / duration); // Adjust this formula for finer control
  const stiffness = 100 * (1 / duration); // Adjust this formula for finer control

  const springValue = useSpring(motionValue, {
    damping,
    stiffness,
  });

  const isInView = useInView(ref, { once: true, margin: "0px" });

  // Start the animation when in view and startWhen is true
  useEffect(() => {
    if (isInView && startWhen) {
      if (typeof onStart === "function") {
        onStart();
      }

      const timeoutId = setTimeout(() => {
        motionValue.set(direction === "down" ? from : to);
      }, delay * 1000);

      const durationTimeoutId = setTimeout(
        () => {
          if (typeof onEnd === "function") {
            onEnd();
          }
        },
        delay * 1000 + duration * 1000,
      );

      return () => {
        clearTimeout(timeoutId);
        clearTimeout(durationTimeoutId);
      };
    }
  }, [
    isInView,
    startWhen,
    motionValue,
    direction,
    from,
    to,
    delay,
    onStart,
    onEnd,
    duration,
  ]);

  // Update text content with formatted number on spring value change
  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        const formattedNumber = getFormattedNumber(Number(latest.toFixed(0)));
        ref.current.textContent = formattedNumber;
      }
    });

    return () => unsubscribe();
  }, [springValue, separator]);

  return (
    <span className={`${className}`} ref={ref}>
      {initialDisplayValue}
    </span>
  );
}
