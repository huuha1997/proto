"use client";
import { useState, useEffect, useCallback, useRef, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ParticleField from "@/components/ui/ParticleField";
import NavDots from "@/components/ui/NavDots";
import Hero from "@/components/sections/Hero";
import { navItems } from "@/lib/data";
import { useIsMobile } from "@/lib/useMediaQuery";
import BrandName from "@/components/ui/BrandName";

// Lazy load sections — only Hero loads eagerly (first screen)
const About = lazy(() => import("@/components/sections/About"));
const Skills = lazy(() => import("@/components/sections/Skills"));
const Experience = lazy(() => import("@/components/sections/Experience"));
const Projects = lazy(() => import("@/components/sections/Projects"));
const Contact = lazy(() => import("@/components/sections/Contact"));

const sections = [Hero, About, Skills, Experience, Projects, Contact];

const variants = {
  enter: (dir: number) => ({
    y: dir > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
  exit: (dir: number) => ({
    y: dir > 0 ? "-100%" : "100%",
    opacity: 0,
    transition: { duration: 0.5, ease: "easeIn" as const },
  }),
};

export default function Page() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const locked = useRef(false);
  const mobile = useIsMobile();

  const navigate = useCallback(
    (next: number) => {
      if (locked.current) return;
      if (next < 0 || next >= sections.length) return;
      locked.current = true;
      setDirection(next > current ? 1 : -1);
      setCurrent(next);
      setTimeout(() => { locked.current = false; }, 900);
    },
    [current]
  );

  // Mouse wheel
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 30) navigate(current + 1);
      else if (e.deltaY < -30) navigate(current - 1);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [current, navigate]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") navigate(current + 1);
      if (e.key === "ArrowUp" || e.key === "PageUp") navigate(current - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, navigate]);

  // Touch
  const touchY = useRef(0);
  useEffect(() => {
    const onStart = (e: TouchEvent) => { touchY.current = e.touches[0].clientY; };
    const onEnd = (e: TouchEvent) => {
      const diff = touchY.current - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 50) navigate(diff > 0 ? current + 1 : current - 1);
    };
    window.addEventListener("touchstart", onStart);
    window.addEventListener("touchend", onEnd);
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [current, navigate]);

  const Section = sections[current];

  return (
    <main className="relative w-screen h-screen overflow-hidden grid-bg">
      <ParticleField />

      {/* Section counter top-left */}
      <div
        className="fixed z-50"
        style={mobile
          ? { top: 12, left: 16 }
          : { top: 32, left: 32 }
        }
      >
        <p
          className="text-[var(--accent)] tracking-[0.25em] uppercase font-medium"
          style={{ fontSize: mobile ? 10 : 12 }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={current}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              style={{ display: "inline-block" }}
            >
              {String(current + 1).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
          {" / "}{String(sections.length).padStart(2, "0")}
        </p>
        <p
          className="text-white/30 mt-0.5 tracking-wider"
          style={{ fontSize: mobile ? 9 : 12 }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={current}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              style={{ display: "inline-block" }}
            >
              {navItems[current]}
            </motion.span>
          </AnimatePresence>
        </p>
      </div>

      {/* Header right */}
      <div
        className="fixed z-50 flex items-center gap-4"
        style={mobile
          ? { top: 12, right: 16 }
          : { top: 32, right: 80 }
        }
      >
        <p style={{ fontSize: mobile ? 8 : 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em" }}>
          Crafted with <span style={{ color: "rgba(0,212,255,0.4)" }}>Claude Code</span>
        </p>
        {!mobile && (
          <>
            <span style={{ width: 1, height: 12, background: "rgba(255,255,255,0.1)" }} />
            <BrandName />
          </>
        )}
      </div>

      {/* Animated sections */}
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full"
        >
          <Suspense fallback={null}>
            <Section onNext={() => navigate(current + 1)} />
          </Suspense>
        </motion.div>
      </AnimatePresence>

      {/* Nav dots */}
      <NavDots current={current} onChange={(i) => navigate(i)} />

      {/* Bottom progress bar */}
      <div className="fixed bottom-0 left-0 right-0 h-0.5 bg-white/5 z-50">
        <motion.div
          className="h-full"
          style={{ background: "linear-gradient(90deg, #00d4ff, #7c3aed)" }}
          animate={{ width: `${((current + 1) / sections.length) * 100}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </main>
  );
}
