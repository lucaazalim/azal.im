"use client";

import * as motion from "@/app/_components/Motion";
import { useAnimation } from "framer-motion";
import { useState } from "react";

const sprite: {
  [key: number]: { x: number; y: number };
} = {
  0: { x: 11, y: 9 },
  1: { x: 94, y: 9 },
  2: { x: 11, y: 92 },
  3: { x: 177, y: 9 },
  4: { x: 94, y: 92 },
  5: { x: 11, y: 175 },
  6: { x: 94, y: 175 },
  7: { x: 177, y: 92 },
  8: { x: 177, y: 175 },
};

export default function Tangerine() {
  const [tangerines, setTangerines] = useState<number>(0);
  const controls = useAnimation();

  const animateClick = () => {
    controls.start({
      scale: [1, 1.05, 1],
      rotate: [0, 10, 0, -10, 0],
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    });
  };

  return (
    <div
      className="bg-accent flex cursor-pointer flex-row items-center gap-4 border px-4 py-3 select-none"
      onClick={() => {
        setTangerines((cookies) => Math.min(cookies + 1, 8));
        animateClick();
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        setTangerines((cookies) => Math.max(cookies - 1, 0));
        animateClick();
      }}
    >
      <motion.img
        src={`/tangerine.png`}
        alt="Tangerine"
        animate={controls}
        style={{
          objectPosition: `${-sprite[tangerines].x}px ${-sprite[tangerines].y}px`,
        }}
        className="h-[75px] w-[68px] object-none"
      />
      <div className="flex flex-col justify-center">
        <span>Leave me a tangerine!</span>
        <div className="flex flex-row items-center gap-2">
          <span className="text-primary font-mono text-xl font-bold">
            {(tangerines + 12024).toLocaleString()}
          </span>
          <span className="font-mono text-xl">({tangerines}/8)</span>
        </div>
      </div>
    </div>
  );
}
