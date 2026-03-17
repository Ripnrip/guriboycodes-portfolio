import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BorderBeam = ({
  className,
  size = 50,
  delay = 0,
  duration = 6,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  reverse = false,
  initialOffset = 0,
  borderWidth = 1,
}) => {
  return (
    <div
      className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden"
      style={{
        border: `${borderWidth}px solid transparent`,
        maskImage: `linear-gradient(transparent, transparent), linear-gradient(#000, #000)`,
        WebkitMaskImage: `linear-gradient(transparent, transparent), linear-gradient(#000, #000)`,
        maskComposite: "exclude",
        WebkitMaskComposite: "xor",
        maskClip: "padding-box, border-box",
        WebkitMaskClip: "padding-box, border-box",
      }}
    >
      <motion.div
        className={cn("absolute aspect-square", className)}
        style={{
          width: size,
          background: `linear-gradient(to left, ${colorFrom}, ${colorTo}, transparent)`,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
        }}
        initial={{ offsetDistance: `${initialOffset}%` }}
        animate={{
          offsetDistance: reverse
            ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
            : [`${initialOffset}%`, `${100 + initialOffset}%`],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
          delay: -delay,
        }}
      />
    </div>
  );
};
