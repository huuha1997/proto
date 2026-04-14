"use client";
import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { profile } from "@/lib/data";
import { Download, ArrowDown } from "lucide-react";
import { useIsMobile } from "@/lib/useMediaQuery";

const roles = [
  "Full-Stack Developer",
  "React / Next.js Engineer",
  "Node.js & NestJs Engineer",
  "AI-Assisted Builder",
];

const floatingBadges = [
  { label: "React", color: "#61dafb", x: "12%", y: "22%" },
  { label: "Next.js", color: "#ffffff", x: "78%", y: "16%" },
  { label: "NestJs", color: "#e0234e", x: "82%", y: "68%" },
  { label: "Flutter", color: "#54c5f8", x: "10%", y: "72%" },
  { label: "TypeScript", color: "#3178c6", x: "48%", y: "85%" },
  { label: "AWS", color: "#ff9900", x: "22%", y: "48%" },
  { label: "GraphQL", color: "#e10098", x: "73%", y: "42%" },
  { label: "Docker", color: "#2496ed", x: "38%", y: "14%" },
];

function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }

    setText(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return text;
}

const DEFAULT_ACCENT = "#00d4ff";

export default function Hero({ onNext }: { onNext: () => void }) {
  const typed = useTypewriter(roles);
  const mobile = useIsMobile();
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  const setThemeColor = useCallback((color: string | null) => {
    const root = document.documentElement;
    const c = color || DEFAULT_ACCENT;
    root.style.setProperty("--accent", c);
    setHoveredColor(color);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      {/* Radial glow bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(0,212,255,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Floating badges — hover to change theme color */}
      {floatingBadges.map((b, i) => (
        <motion.div
          key={b.label}
          className="absolute rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-wide cursor-pointer select-none"
          style={{
            left: b.x, top: b.y, color: b.color,
            border: `1px solid ${hoveredColor === b.color ? b.color : `${b.color}25`}`,
            background: hoveredColor === b.color ? `${b.color}20` : `${b.color}08`,
            display: mobile ? "none" : undefined,
            transition: "border-color 0.3s, background 0.3s, opacity 0.3s, transform 0.3s",
            zIndex: hoveredColor === b.color ? 20 : 1,
          }}
          animate={{
            y: [0, -8, 0],
            scale: hoveredColor === b.color ? 1.2 : 1,
            opacity: hoveredColor === b.color ? 1 : hoveredColor ? 0.2 : 0.5,
          }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 0.5, scale: 1 }}
          onMouseEnter={() => setThemeColor(b.color)}
          onMouseLeave={() => setThemeColor(null)}
        >
          {b.label}
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[var(--accent)] text-sm tracking-[0.3em] uppercase mb-6 font-medium"
        >
          Hello, I&apos;m
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            fontSize: mobile ? 40 : undefined,
            backgroundImage: hoveredColor
              ? `linear-gradient(135deg, ${hoveredColor}, ${hoveredColor}88)`
              : "linear-gradient(135deg, #00d4ff, #7c3aed)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            transition: "background-image 0.4s ease",
          }}
          className="text-7xl md:text-8xl font-black mb-6 tracking-tight leading-none"
        >
          Tam Phan Minh
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xl md:text-2xl text-[var(--muted)] h-9 flex items-center justify-center gap-1 mb-10"
          style={{ fontSize: mobile ? 16 : undefined }}
        >
          <span>{typed}</span>
          <span
            className="inline-block w-0.5 h-6 bg-[var(--accent)]"
            style={{ animation: "pulse-glow 1s ease-in-out infinite" }}
          />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex flex-wrap gap-5 justify-center mb-14"
          style={mobile ? { flexDirection: "column", alignItems: "center", gap: 12 } : undefined}
        >
          <button
            onClick={onNext}
            className="px-10! py-3.5 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 text-white"
            style={{
              background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
              boxShadow: "0 0 20px rgba(0,212,255,0.2)",
            }}
          >
            View My Work
          </button>
          <a
            href="/api/cv"
            download="TamPhanMinh_CV.pdf"
            className="px-10! py-3.5 rounded-full font-semibold text-sm tracking-wide glass hover:scale-105 transition-all duration-300 flex items-center gap-2 text-[var(--accent)]"
          >
            <Download size={16} />
            Download CV
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="flex gap-14 justify-center"
          style={mobile ? { gap: 24 } : undefined}
        >
          {[
            { num: "5+", label: "Years Exp" },
            { num: "10+", label: "Projects" },
            { num: "3", label: "Countries" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-black gradient-text" style={mobile ? { fontSize: 24 } : undefined}>{s.num}</div>
              <div className="text-[10px] text-[var(--muted)] tracking-widest uppercase mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 flex flex-col items-center gap-2 text-[var(--muted)] text-xs tracking-widest uppercase"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <span>Scroll</span>
        <ArrowDown size={14} />
      </motion.div>
    </div>
  );
}
