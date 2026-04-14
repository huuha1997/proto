"use client";
import { motion } from "framer-motion";
import { skills } from "@/lib/data";
import { hexToRgba } from "@/lib/colors";

const categoryConfig: Record<string, { color: string }> = {
  Frontend: { color: "#00d4ff" },
  Backend: { color: "#a78bfa" },
  Mobile: { color: "#f472b6" },
  DevOps: { color: "#fbbf24" },
  "AI Tools": { color: "#34d399" },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};
const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

const orderedCategories = ["Frontend", "Backend", "Mobile", "DevOps", "AI Tools"];

export default function Skills() {
  return (
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "72px 80px 56px",
      boxSizing: "border-box",
    }}>
      <div style={{ maxWidth: 1024, width: "100%" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: 40 }}
        >
          <p style={{
            color: "#00d4ff", fontSize: 11, letterSpacing: "0.25em",
            textTransform: "uppercase", fontWeight: 600, marginBottom: 8,
          }}>
            Tech Stack
          </p>
          <h2 style={{ fontSize: 40, fontWeight: 900, lineHeight: 1.1 }}>
            Skills & <span className="gradient-text">Tooling</span>
          </h2>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "32px 64px",
        }}>
          {orderedCategories.map((category, catIdx) => {
            const cfg = categoryConfig[category];
            const items_list = skills[category as keyof typeof skills];
            return (
              <div key={category}>
                <motion.p
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: catIdx * 0.06 }}
                  style={{
                    fontSize: 11, fontWeight: 700, letterSpacing: "0.15em",
                    textTransform: "uppercase", marginBottom: 12,
                    color: cfg.color,
                  }}
                >
                  {category}
                </motion.p>
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  style={{ display: "flex", flexWrap: "wrap", gap: 10 }}
                >
                  {items_list.map((skill) => (
                    <motion.div
                      key={skill}
                      variants={item}
                      whileHover={{
                        scale: 1.06,
                        boxShadow: `0 0 16px ${hexToRgba(cfg.color, 0.35)}`,
                        y: -2,
                      }}
                      style={{
                        padding: "8px 16px",
                        borderRadius: 10,
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: "default",
                        whiteSpace: "nowrap",
                        background: hexToRgba(cfg.color, 0.12),
                        border: `1px solid ${hexToRgba(cfg.color, 0.3)}`,
                        color: cfg.color,
                        transition: "all 0.2s",
                      }}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
