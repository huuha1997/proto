"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "@/lib/data";
import { Download, ArrowDown } from "lucide-react";

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

export default function Hero({ onNext }: { onNext: () => void }) {
  const typed = useTypewriter(roles);

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

      {/* Floating badges */}
      {floatingBadges.map((b, i) => (
        <motion.div
          key={b.label}
          className="absolute rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide pointer-events-none"
          style={{
            left: b.x, top: b.y, color: b.color,
            border: `1px solid ${b.color}25`,
            background: `${b.color}08`,
          }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 0.5, scale: 1 }}
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
          className="text-7xl md:text-8xl font-black mb-6 tracking-tight leading-none"
        >
          <span className="gradient-text">Tam Phan Minh</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xl md:text-2xl text-[var(--muted)] h-9 flex items-center justify-center gap-1 mb-10"
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
        >
          <button
            onClick={onNext}
            className="px-10 py-3.5 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105 text-white"
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
            className="px-10 py-3.5 rounded-full font-semibold text-sm tracking-wide glass hover:scale-105 transition-all duration-300 flex items-center gap-2 text-[var(--accent)]"
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
        >
          {[
            { num: "5+", label: "Years Exp" },
            { num: "10+", label: "Projects" },
            { num: "3", label: "Countries" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-black gradient-text">{s.num}</div>
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
