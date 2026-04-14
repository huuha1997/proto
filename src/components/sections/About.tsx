"use client";
import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import { MapPin, Mail, Phone, Code2, Layers, Cpu, GraduationCap } from "lucide-react";
import { hexToRgba } from "@/lib/colors";
import { useIsMobile } from "@/lib/useMediaQuery";

const highlights = [
  {
    icon: Code2,
    title: "Full-Stack",
    desc: "Web, mobile, desktop -- TypeScript to Flutter.",
    color: "#00d4ff",
  },
  {
    icon: Layers,
    title: "Architecture",
    desc: "GraphQL APIs, AWS deployment, CI/CD pipelines.",
    color: "#7c3aed",
  },
  {
    icon: Cpu,
    title: "AI-Augmented",
    desc: "Claude Code, Cursor, Agentic workflows.",
    color: "#f472b6",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function About() {
  const mobile = useIsMobile();

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ padding: mobile ? "48px 20px 32px" : "64px 80px" }}
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-5xl w-full"
        style={{
          display: "grid",
          gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
          gap: mobile ? 24 : 56,
          alignItems: "center",
        }}
      >
        {/* Left: Bio */}
        <div>
          <motion.p
            variants={item}
            className="text-[var(--accent)] text-xs tracking-[0.3em] uppercase mb-3 font-medium"
          >
            About Me
          </motion.p>

          <motion.h2
            variants={item}
            className="font-black mb-5 leading-tight"
            style={{ fontSize: mobile ? 28 : 40 }}
          >
            Building things
            <br />
            <span className="gradient-text">that actually work.</span>
          </motion.h2>

          <motion.p variants={item} className="text-[var(--muted)] text-base leading-relaxed mb-6">
            {profile.summary}
          </motion.p>

          <motion.div variants={item} className="space-y-2.5">
            {[
              { icon: MapPin, text: profile.location },
              { icon: Mail, text: profile.email },
              { icon: Phone, text: profile.phone },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-[var(--muted)] text-sm">
                <Icon size={14} className="text-[var(--accent)] shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Highlight cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {highlights.map((h) => (
            <motion.div
              key={h.title}
              variants={item}
              whileHover={{ scale: 1.02, x: 4 }}
              style={{
                display: "flex", alignItems: "flex-start", gap: 16,
                padding: "20px 24px",
                borderRadius: 14,
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(16px)",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                borderRight: "1px solid rgba(255, 255, 255, 0.08)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                borderLeft: `3px solid ${h.color}`,
                cursor: "default",
              }}
            >
              <div style={{
                padding: 10, borderRadius: 10, flexShrink: 0,
                background: hexToRgba(h.color, 0.15),
              }}>
                <h.icon size={20} style={{ color: h.color }} />
              </div>
              <div>
                <h3 style={{ fontWeight: 700, color: "#fff", fontSize: 14, marginBottom: 3 }}>{h.title}</h3>
                <p style={{ color: "var(--muted)", fontSize: 12, lineHeight: 1.5 }}>{h.desc}</p>
              </div>
            </motion.div>
          ))}

          {/* Education badge */}
          <motion.div
            variants={item}
            style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "18px 24px",
              borderRadius: 14,
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <div style={{ padding: 10, borderRadius: 10, flexShrink: 0, background: "rgba(251, 191, 36, 0.15)" }}>
              <GraduationCap size={20} style={{ color: "#fbbf24" }} />
            </div>
            <div>
              <p style={{ fontWeight: 600, color: "#fff", fontSize: 14 }}>Web Developer -- FPT Polytechnic</p>
              <p style={{ color: "var(--muted)", fontSize: 12, marginTop: 2 }}>2017 -- 2020</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
