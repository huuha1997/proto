"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { projects } from "@/lib/data";
import { hexToRgba } from "@/lib/colors";
import { Users, Building2, User, ChevronLeft, ChevronRight, Monitor, ExternalLink, Maximize2, X } from "lucide-react";
import { useIsMobile } from "@/lib/useMediaQuery";

const accents = ["#00d4ff", "#a78bfa", "#f472b6", "#fbbf24", "#34d399"];

export default function Projects() {
  const [active, setActive] = useState(0);
  const [slideIdx, setSlideIdx] = useState(0);
  const p = projects[active];
  const accent = accents[active % accents.length];
  const hasImages = p.images.length > 0;
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const iframeTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const mobile = useIsMobile();
  const [fullscreen, setFullscreen] = useState(false);

  // Delay iframe load by 300ms after tab switch to keep animation smooth
  useEffect(() => {
    setIframeLoaded(false);
    if (p.demo) {
      iframeTimerRef.current = setTimeout(() => setIframeLoaded(true), 400);
    }
    return () => { if (iframeTimerRef.current) clearTimeout(iframeTimerRef.current); };
  }, [active, p.demo]);

  // Auto-advance slides
  useEffect(() => {
    if (!hasImages) return;
    const timer = setInterval(() => {
      setSlideIdx((s) => (s + 1) % p.images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [active, hasImages, p.images.length]);

  // Reset slide + fullscreen on tab change
  useEffect(() => { setSlideIdx(0); setFullscreen(false); }, [active]);

  // ESC to close fullscreen
  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setFullscreen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fullscreen]);

  const prevSlide = useCallback(() => {
    if (!hasImages) return;
    setSlideIdx((s) => (s - 1 + p.images.length) % p.images.length);
  }, [hasImages, p.images.length]);

  const nextSlide = useCallback(() => {
    if (!hasImages) return;
    setSlideIdx((s) => (s + 1) % p.images.length);
  }, [hasImages, p.images.length]);

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: mobile ? "48px 20px 32px" : "72px 80px 48px",
      boxSizing: "border-box",
    }}>
      <div style={{ maxWidth: 1024, width: "100%", display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ flexShrink: 0, marginBottom: mobile ? 12 : 20 }}
        >
          <p style={{
            color: "#00d4ff", fontSize: 11, letterSpacing: "0.25em",
            textTransform: "uppercase", fontWeight: 600, marginBottom: 8,
          }}>
            Portfolio
          </p>
          <h2 style={{ fontSize: mobile ? 28 : 40, fontWeight: 900, lineHeight: 1.1 }}>
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        {/* Tab bar */}
        <div style={{
          display: "flex", gap: 4, flexShrink: 0, marginBottom: mobile ? 12 : 16,
          overflowX: "auto", scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
        }}
        className="[&::-webkit-scrollbar]:hidden"
        >
          {projects.map((proj, i) => {
            const tabAccent = accents[i % accents.length];
            const isActive = active === i;
            return (
              <motion.button
                key={i}
                onClick={() => setActive(i)}
                whileHover={{ y: -1 }}
                style={{
                  padding: mobile ? "8px 14px" : "10px 20px",
                  borderRadius: 10,
                  fontSize: mobile ? 11 : 12,
                  fontWeight: isActive ? 700 : 500,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s",
                  background: isActive ? hexToRgba(tabAccent, 0.15) : "rgba(255,255,255,0.03)",
                  border: `1px solid ${isActive ? hexToRgba(tabAccent, 0.4) : "rgba(255,255,255,0.06)"}`,
                  color: isActive ? tabAccent : "var(--muted)",
                  flexShrink: 0,
                }}
              >
                {proj.shortTitle}
              </motion.button>
            );
          })}
        </div>

        {/* Content area */}
        <div style={{ flex: 1, minHeight: 0, maxHeight: mobile ? undefined : "calc(100vh - 280px)" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.3 }}
              style={{
                display: mobile ? "flex" : "grid",
                flexDirection: mobile ? "column" : undefined,
                gridTemplateColumns: mobile ? undefined : "1fr 1fr",
                gap: 20,
                height: "100%",
                maxHeight: mobile ? undefined : "calc(100vh - 280px)",
              }}
            >
              {/* Left: Live demo / slideshow / placeholder */}
              <div style={{
                borderRadius: 16,
                overflow: "hidden",
                background: hexToRgba(accent, 0.06),
                border: `1px solid ${hexToRgba(accent, 0.2)}`,
                display: "flex",
                flexDirection: "column",
                position: "relative",
                minHeight: mobile ? 200 : undefined,
              }}>
                {hasImages ? (
                  /* Image slideshow */
                  <>
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={slideIdx}
                        src={p.images[slideIdx]}
                        alt={`${p.title} screenshot ${slideIdx + 1}`}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          width: "100%", height: "100%",
                          objectFit: "contain",
                          position: "absolute", inset: 0,
                          padding: 8,
                        }}
                      />
                    </AnimatePresence>
                    <div style={{
                      position: "absolute", bottom: 16, left: 0, right: 0,
                      display: "flex", justifyContent: "center", alignItems: "center", gap: 12,
                      zIndex: 2,
                    }}>
                      <button onClick={prevSlide} style={{
                        width: 32, height: 32, borderRadius: "50%",
                        background: "rgba(0,0,0,0.5)", border: "none",
                        color: "#fff", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <ChevronLeft size={16} />
                      </button>
                      <div style={{ display: "flex", gap: 6 }}>
                        {p.images.map((_, idx) => (
                          <div key={idx} style={{
                            width: 8, height: 8, borderRadius: "50%",
                            background: idx === slideIdx ? accent : "rgba(255,255,255,0.3)",
                            cursor: "pointer",
                          }} onClick={() => setSlideIdx(idx)} />
                        ))}
                      </div>
                      <button onClick={nextSlide} style={{
                        width: 32, height: 32, borderRadius: "50%",
                        background: "rgba(0,0,0,0.5)", border: "none",
                        color: "#fff", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <ChevronRight size={16} />
                      </button>
                    </div>
                    {/* Top-right buttons */}
                    <div style={{ position: "absolute", top: 12, right: 12, display: "flex", gap: 6, zIndex: 2 }}>
                      {p.demo && (
                        <a href={p.demo} target="_blank" rel="noopener noreferrer" style={{
                          display: "flex", alignItems: "center", gap: 6,
                          padding: "6px 12px", borderRadius: 8,
                          background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
                          color: "#fff", fontSize: 11, fontWeight: 600, textDecoration: "none",
                        }}>
                          <ExternalLink size={12} />
                          {p.demo.startsWith("/") ? "Interactive" : "Open site"}
                        </a>
                      )}
                      <button onClick={() => setFullscreen(true)} style={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        width: 32, height: 32, borderRadius: 8, border: "none", cursor: "pointer",
                        background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", color: "#fff",
                      }}>
                        <Maximize2 size={14} />
                      </button>
                    </div>
                  </>
                ) : p.demo ? (
                  /* Demo iframe -- lazy loaded */
                  <>
                    {iframeLoaded ? (
                      <iframe
                        src={p.demo}
                        title={`${p.title} live demo`}
                        style={{ width: "100%", height: "100%", border: "none", borderRadius: 16 }}
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin"
                      />
                    ) : (
                      <div style={{
                        display: "flex", flex: 1, alignItems: "center", justifyContent: "center",
                        color: "var(--muted)", fontSize: 12,
                      }}>
                        Loading preview...
                      </div>
                    )}
                    <div style={{ position: "absolute", top: 12, right: 12, display: "flex", gap: 6, zIndex: 2 }}>
                      <a href={p.demo} target="_blank" rel="noopener noreferrer" style={{
                        display: "flex", alignItems: "center", gap: 6,
                        padding: "6px 12px", borderRadius: 8,
                        background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
                        color: "#fff", fontSize: 11, fontWeight: 600, textDecoration: "none",
                      }}>
                        <ExternalLink size={12} /> Open site
                      </a>
                      <button onClick={() => setFullscreen(true)} style={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        width: 32, height: 32, borderRadius: 8, border: "none", cursor: "pointer",
                        background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", color: "#fff",
                      }}>
                        <Maximize2 size={14} />
                      </button>
                    </div>
                  </>
                ) : (
                  /* Placeholder */
                  <div style={{
                    display: "flex", flexDirection: "column", flex: 1,
                    alignItems: "center", justifyContent: "center",
                    gap: 12, color: "var(--muted)",
                  }}>
                    <Monitor size={48} style={{ color: hexToRgba(accent, 0.3) }} />
                    <p style={{ fontSize: 13, fontWeight: 500 }}>Demo coming soon</p>
                  </div>
                )}
              </div>

              {/* Right: Project details */}
              <div style={{
                borderRadius: 16,
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: mobile ? 20 : 28,
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
                scrollbarWidth: "none",
              }}
              className="[&::-webkit-scrollbar]:hidden"
              >
                {/* Header */}
                <h3 style={{ fontSize: mobile ? 16 : 18, fontWeight: 900, color: "#fff", marginBottom: 4 }}>
                  {p.title}
                </h3>
                <div style={{
                  display: "flex", gap: 12, marginBottom: 16, fontSize: 11, color: "var(--muted)",
                  flexWrap: "wrap", alignItems: "center",
                }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <Building2 size={11} style={{ color: accent }} /> {p.company}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <User size={11} style={{ color: accent }} /> {p.role}
                  </span>
                  {p.size && (
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Users size={11} style={{ color: accent }} /> {p.size}
                    </span>
                  )}
                  {p.aiCoded === false && (
                    <span style={{
                      fontSize: 9, padding: "2px 8px", borderRadius: 6, fontWeight: 700,
                      background: "rgba(251,191,36,0.12)", color: "#fbbf24",
                      border: "1px solid rgba(251,191,36,0.25)",
                      textTransform: "uppercase", letterSpacing: "0.05em",
                    }}>
                      No AI
                    </span>
                  )}
                </div>

                {/* Description */}
                {p.descriptionHtml ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: p.descriptionHtml }}
                    style={{
                      color: "var(--muted)", fontSize: 13, lineHeight: 1.7,
                      marginBottom: 16,
                    }}
                  />
                ) : (
                  <p style={{
                    color: "var(--muted)", fontSize: 13, lineHeight: 1.7,
                    marginBottom: 16,
                  }}>
                    {p.description}
                  </p>
                )}

                {/* Highlights */}
                <ul style={{ listStyle: "none", padding: 0, marginBottom: 20, flex: 1 }}>
                  {p.highlights.map((h, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      style={{
                        display: "flex", gap: 10, fontSize: 12,
                        color: "var(--muted)", lineHeight: 1.7, marginBottom: 6,
                      }}
                    >
                      <span style={{ color: accent, flexShrink: 0, marginTop: 2 }}>&#9656;</span>
                      {h}
                    </motion.li>
                  ))}
                </ul>

                {/* Links */}
                {(p.demo || p.appStore || p.github) && (
                  <div style={{ display: "flex", gap: 8, flexShrink: 0, marginBottom: 12, flexWrap: "wrap" }}>
                    {p.demo && (
                      <a href={p.demo} target="_blank" rel="noopener noreferrer" style={{
                        display: "flex", alignItems: "center", gap: 6,
                        fontSize: 11, fontWeight: 600, padding: "6px 14px", borderRadius: 8,
                        background: hexToRgba(accent, 0.12), color: accent,
                        border: `1px solid ${hexToRgba(accent, 0.3)}`,
                        textDecoration: "none",
                      }}>
                        <ExternalLink size={12} /> Live Site
                      </a>
                    )}
                    {p.appStore && (
                      <a href={p.appStore} target="_blank" rel="noopener noreferrer" style={{
                        display: "flex", alignItems: "center", gap: 6,
                        fontSize: 11, fontWeight: 600, padding: "6px 14px", borderRadius: 8,
                        background: "rgba(255,255,255,0.06)",
                        color: "#fff",
                        border: "1px solid rgba(255,255,255,0.15)",
                        textDecoration: "none",
                      }}>
                        App Store
                      </a>
                    )}
                  </div>
                )}

                {/* Tech tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, flexShrink: 0 }}>
                  {p.tech.map((t) => (
                    <span key={t} style={{
                      fontSize: 11, padding: "5px 12px", borderRadius: 8, fontWeight: 600,
                      background: hexToRgba(accent, 0.12),
                      color: accent,
                      border: `1px solid ${hexToRgba(accent, 0.3)}`,
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Fullscreen overlay */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreen(false)}
            style={{
              position: "fixed", inset: 0, zIndex: 100,
              background: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: 40, cursor: "zoom-out",
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setFullscreen(false)}
              style={{
                position: "absolute", top: 20, right: 20,
                width: 40, height: 40, borderRadius: 10, border: "none",
                background: "rgba(255,255,255,0.1)", color: "#fff",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <X size={20} />
            </button>

            {/* Content */}
            {hasImages ? (
              <img
                src={p.images[slideIdx]}
                alt={p.title}
                onClick={(e) => e.stopPropagation()}
                style={{
                  maxWidth: "100%", maxHeight: "100%",
                  objectFit: "contain", borderRadius: 12,
                  cursor: "default",
                }}
              />
            ) : p.demo ? (
              <iframe
                src={p.demo}
                title={`${p.title} fullscreen`}
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: "100%", height: "100%",
                  border: "none", borderRadius: 12,
                  cursor: "default",
                }}
                sandbox="allow-scripts allow-same-origin"
              />
            ) : null}

            {/* Title */}
            <div style={{
              position: "absolute", bottom: 20, left: 0, right: 0,
              textAlign: "center", color: "rgba(255,255,255,0.5)",
              fontSize: 12, fontWeight: 600,
            }}>
              {p.title} — Press ESC or click to close
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
