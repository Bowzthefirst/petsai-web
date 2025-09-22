"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import React, { useId } from "react";

export const Background = () => {
  return (
    <div className="absolute inset-0 h-full w-full pointer-events-none z-0">
      <div className="absolute inset-0 h-full w-full bg-white dark:bg-black pointer-events-none [mask-image:radial-gradient(ellipse_at_center,transparent,white)]" />
      {Array.from({ length: 6 }).map((_, index) => (
        <div className="flex" key={"grid-column" + index}>
          {Array.from({ length: 10 }).map((_, index) => (
            <GridBlock key={`grid-row` + index} />
          ))}
        </div>
      ))}
    </div>
  );
};

const GridBlock = () => {
  return (
    <div className="flex flex-col items-start justify-center  w-60">
      <div className="flex items-center justify-center">
        <Dot />
        <SVG />
        {/* <Dot /> */}
      </div>
      <SVGVertical className="ml-3" />
    </div>
  );
};

const Dot = () => {
  return (
    <div className="h-6 w-6 bg-white dark:bg-neutral-900 flex items-center justify-center rounded-full">
      <div className="h-2 w-2 bg-neutral-200 dark:bg-neutral-700 rounded-full" />
    </div>
  );
};

const SVGVertical = ({ className }: { className?: string }) => {
  const width = 1;
  const height = 140;

  const id = useId();
  
  // Expanded array of vibrant gradient colors
  const colors = [
    "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FECA57", "#FF9FF3",
    "#54A0FF", "#5F27CD", "#00D2D3", "#FF9F43", "#EE5A24", "#0ABDE3",
    "#C44569", "#F8B500", "#6C5CE7", "#A29BFE", "#FD79A8", "#FDCB6E",
    "#E17055", "#74B9FF", "#00B894", "#E84393", "#FDCB6E", "#6C5CE7",
    "#FF7675", "#74B9FF", "#55A3FF", "#26DE81", "#FD79A8", "#FDCB6E",
    "#46A5CA", "#8C2F2F", "#4FAE4D", "#D6590C", "#811010", "#247AFB",
    "#A534A0", "#A8A438", "#46A29C", "#670F6D", "#D7C200", "#59BBEB",
    "#504F1C", "#55BC54", "#4D3568", "#9F39A5", "#363636", "#860909"
  ];
  
  // Use id hash for deterministic color selection to avoid hydration mismatch
  const colorIndex = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  const selectedColor = colors[colorIndex];
  
  return (
    <motion.svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-neutral-100 dark:text-neutral-800", className)}
    >
      <path d="M0.5 0.5V479" stroke="currentColor" strokeWidth={2} />
      <motion.path
        d="M0.5 0.5V479"
        stroke={`url(#gradient-${id})`}
        strokeWidth={2}
      />

      <defs>
        <motion.linearGradient
          id={`gradient-${id}`}
          initial={{ x1: 2, y1: -200, x2: 2, y2: -100 }}
          animate={{ x1: 2, y1: 400, x2: 2, y2: 600 }}
          transition={{
            repeat: Infinity,
            duration: colorIndex * 0.1 + 2,
            delay: (colorIndex % 6) + 1,
          }}
          gradientUnits="userSpaceOnUse"
        >
          <motion.stop offset="0%" stopColor="transparent" />
          <motion.stop offset="50%" stopColor={selectedColor} />
          <motion.stop offset="100%" stopColor="transparent" />
        </motion.linearGradient>
      </defs>
    </motion.svg>
  );
};

const SVG = ({ className }: { className?: string }) => {
  const width = 300;
  const height = 1;

  const id = useId();
  
  // Expanded array of vibrant gradient colors (same as vertical)
  const colors = [
    "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FECA57", "#FF9FF3",
    "#54A0FF", "#5F27CD", "#00D2D3", "#FF9F43", "#EE5A24", "#0ABDE3",
    "#C44569", "#F8B500", "#6C5CE7", "#A29BFE", "#FD79A8", "#FDCB6E",
    "#E17055", "#74B9FF", "#00B894", "#E84393", "#FDCB6E", "#6C5CE7",
    "#FF7675", "#74B9FF", "#55A3FF", "#26DE81", "#FD79A8", "#FDCB6E",
    "#46A5CA", "#8C2F2F", "#4FAE4D", "#D6590C", "#811010", "#247AFB",
    "#A534A0", "#A8A438", "#46A29C", "#670F6D", "#D7C200", "#59BBEB",
    "#504F1C", "#55BC54", "#4D3568", "#9F39A5", "#363636", "#860909"
  ];
  
  // Use id hash for deterministic color selection to avoid hydration mismatch
  const colorIndex = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  const selectedColor = colors[colorIndex];
  
  return (
    <motion.svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-neutral-100 dark:text-neutral-800", className)}
    >
      <path d="M0.5 0.5H479" stroke="currentColor" />
      <motion.path
        d="M0.5 0.5H479"
        stroke={`url(#gradient-${id})`}
        strokeWidth={1}
      />

      <defs>
        <motion.linearGradient
          id={`gradient-${id}`}
          initial={{ x1: -200, y1: 0, x2: -100, y2: 0 }}
          animate={{ x1: 400, y1: 0, x2: 600, y2: 0 }}
          transition={{
            repeat: Infinity,
            duration: colorIndex * 0.1 + 2,
            delay: (colorIndex % 6) + 1,
          }}
          gradientUnits="userSpaceOnUse"
        >
          <motion.stop offset="0%" stopColor="transparent" />
          <motion.stop offset="50%" stopColor={selectedColor} />
          <motion.stop offset="100%" stopColor="transparent" />
        </motion.linearGradient>
      </defs>
    </motion.svg>
  );
};

// Use the below rect to debug linear gradient
{
  /* <motion.rect width={width} height={width} fill={`url(#gradient-${id})`} /> */
}
