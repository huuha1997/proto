"use client";
import { motion } from "framer-motion";
import { navItems } from "@/lib/data";

interface Props {
  current: number;
  onChange: (i: number) => void;
}

export default function NavDots({ current, onChange }: Props) {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 items-center">
      {navItems.map((label, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className="group relative flex items-center gap-3"
        >
          <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs text-[var(--accent)] whitespace-nowrap font-medium tracking-wider uppercase">
            {label}
          </span>
          <motion.div
            animate={{
              scale: current === i ? 1 : 0.6,
              backgroundColor: current === i ? "#00d4ff" : "rgba(255,255,255,0.2)",
              boxShadow: current === i
                ? "0 0 12px rgba(0,212,255,0.8)"
                : "0 0 0px transparent",
            }}
            transition={{ duration: 0.3 }}
            className="w-3 h-3 rounded-full"
          />
        </button>
      ))}
    </div>
  );
}
