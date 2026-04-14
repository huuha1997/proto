"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { experiences } from "@/lib/data";
import { hexToRgba } from "@/lib/colors";
import { MapPin, Calendar, ChevronRight } from "lucide-react";

const ACCENT = "#00d4ff";
const GREEN = "#34d399";

export default function Experience() {
  const [active, setActive] = useState(0);
  const exp = experiences[active];

  return (
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "72px 80px 56px",
      boxSizing: "border-box",
    }}>
      <div style={{ maxWidth: 1024, width: "100%" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: 28 }}
        >
          <p style={{
            color: ACCENT, fontSize: 11, letterSpacing: "0.25em",
            textTransform: "uppercase", fontWeight: 600, marginBottom: 8,
          }}>
            Career
          </p>
          <h2 style={{ fontSize: 40, fontWeight: 900, lineHeight: 1.1 }}>
            Work <span className="gradient-text">Experience</span>
          </h2>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 3fr",
          gap: 24,
          maxHeight: 420,
        }}>
          {/* Company list */}
          <div style={{
            display: "flex", flexDirection: "column", gap: 8,
            overflowY: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          className="[&::-webkit-scrollbar]:hidden"
          >
            {experiences.map((e, i) => (
              <motion.button
                key={i}
                onClick={() => setActive(i)}
                whileHover={{ x: 4 }}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: 16,
                  borderRadius: 12,
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                  background: active === i
                    ? `linear-gradient(135deg, ${hexToRgba(ACCENT, 0.12)}, ${hexToRgba("#7c3aed", 0.08)})`
                    : "rgba(255,255,255,0.03)",
                  border: `1px solid ${active === i ? hexToRgba(ACCENT, 0.4) : "rgba(255,255,255,0.06)"}`,
                  transition: "all 0.2s",
                }}
              >
                {active === i && (
                  <motion.div
                    layoutId="activeLine"
                    style={{
                      position: "absolute", left: 0, top: 0, bottom: 0, width: 3,
                      background: ACCENT,
                      boxShadow: `0 0 8px ${ACCENT}`,
                      borderRadius: 2,
                    }}
                  />
                )}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <p style={{
                      fontWeight: 700, fontSize: 13,
                      color: active === i ? ACCENT : "rgba(255,255,255,0.8)",
                    }}>
                      {e.company}
                    </p>
                    <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{e.role}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, marginLeft: 8 }}>
                    {e.current && (
                      <span style={{
                        fontSize: 10, padding: "3px 8px", borderRadius: 99, fontWeight: 600,
                        background: hexToRgba(GREEN, 0.15), color: GREEN,
                      }}>
                        Now
                      </span>
                    )}
                    <ChevronRight size={14} style={{ color: active === i ? ACCENT : "var(--muted)" }} />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Detail panel */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 16,
                  padding: 32,
                  height: "100%",
                  overflowY: "auto",
                  boxSizing: "border-box",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20, gap: 16 }}>
                  <div style={{ minWidth: 0 }}>
                    <h3 style={{ fontSize: 22, fontWeight: 900, color: "#fff" }}>{exp.role}</h3>
                    <p style={{ color: ACCENT, fontWeight: 600, marginTop: 4, fontSize: 14 }}>{exp.company}</p>
                  </div>
                  {exp.current && (
                    <span style={{
                      display: "flex", alignItems: "center", gap: 6,
                      fontSize: 11, fontWeight: 600, padding: "6px 12px",
                      borderRadius: 99, flexShrink: 0,
                      background: hexToRgba(GREEN, 0.15), color: GREEN,
                    }}>
                      <span style={{
                        width: 6, height: 6, borderRadius: "50%",
                        background: GREEN, display: "inline-block",
                      }} />
                      Current
                    </span>
                  )}
                </div>

                <div style={{ display: "flex", gap: 16, marginBottom: 24, fontSize: 12, color: "var(--muted)" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Calendar size={12} /> {exp.period}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <MapPin size={12} /> {exp.location}
                  </span>
                </div>

                <ul style={{ listStyle: "none", padding: 0, marginBottom: 24 }}>
                  {exp.highlights.map((h, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      style={{
                        display: "flex", gap: 10, fontSize: 13, color: "var(--muted)",
                        lineHeight: 1.7, marginBottom: 8,
                      }}
                    >
                      <span style={{ color: ACCENT, flexShrink: 0, marginTop: 2 }}>&#9656;</span>
                      {h}
                    </motion.li>
                  ))}
                </ul>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {exp.tech.map((t) => (
                    <span key={t} style={{
                      fontSize: 12, padding: "6px 14px", borderRadius: 8, fontWeight: 600,
                      background: hexToRgba(ACCENT, 0.12),
                      color: ACCENT,
                      border: `1px solid ${hexToRgba(ACCENT, 0.3)}`,
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
