"use client";
import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import { Mail, Phone, MapPin, Send, GitBranch } from "lucide-react";

const contacts = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone}` },
  { icon: MapPin, label: "Location", value: profile.location, href: null },
];

function ContactCard({ icon: Icon, label, value, href }: {
  icon: typeof Mail; label: string; value: string; href: string | null;
}) {
  const inner = (
    <>
      <div style={{
        width: 52, height: 52, borderRadius: 14,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(0, 212, 255, 0.1)",
      }}>
        <Icon size={22} style={{ color: "#00d4ff" }} />
      </div>
      <div>
        <p style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>
          {label}
        </p>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{value}</p>
      </div>
    </>
  );

  const style: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 14,
    textAlign: "center",
    padding: "28px 24px",
    borderRadius: 16,
    background: "rgba(255, 255, 255, 0.04)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(0, 212, 255, 0.15)",
    textDecoration: "none",
    transition: "border-color 0.3s, transform 0.3s",
  };

  if (href) {
    return <a href={href} style={style}>{inner}</a>;
  }
  return <div style={style}>{inner}</div>;
}

export default function Contact() {
  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "72px 80px 56px",
      boxSizing: "border-box",
    }}>
      <div style={{ maxWidth: 800, width: "100%", position: "relative" }}>
        {/* Radial glow */}
        <div style={{
          position: "absolute", inset: -200, pointerEvents: "none",
          background: "radial-gradient(ellipse 50% 60% at 50% 40%, rgba(124,58,237,0.08) 0%, transparent 70%)",
        }} />

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: "center", marginBottom: 40, position: "relative", zIndex: 1 }}
        >
          <p style={{
            color: "#00d4ff", fontSize: 11, letterSpacing: "0.25em",
            textTransform: "uppercase", fontWeight: 600, marginBottom: 10,
          }}>
            Get In Touch
          </p>
          <h2 style={{ fontSize: 48, fontWeight: 900, marginBottom: 12 }}>
            Let&apos;s <span className="gradient-text-warm">Work Together</span>
          </h2>
          <p style={{ color: "var(--muted)", fontSize: 16, maxWidth: 400, margin: "0 auto", lineHeight: 1.6 }}>
            Open to new opportunities. Drop a message and I&apos;ll get back to you.
          </p>
        </motion.div>

        {/* Contact cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          marginBottom: 28,
          position: "relative",
          zIndex: 1,
        }}>
          {contacts.map(({ icon, label, value, href }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.04, y: -4 }}
            >
              <ContactCard icon={icon} label={label} value={value} href={href} />
            </motion.div>
          ))}
        </div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            display: "flex", gap: 16, justifyContent: "center", alignItems: "center",
            position: "relative", zIndex: 1,
          }}
        >
          <a
            href={`mailto:${profile.email}`}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: 8, padding: "14px 32px", borderRadius: 99,
              fontWeight: 600, fontSize: 14, color: "#fff",
              background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
              boxShadow: "0 0 24px rgba(0,212,255,0.2)",
              textDecoration: "none", transition: "transform 0.2s",
            }}
          >
            <Send size={16} />
            Send Email
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer"
            style={{
              width: 48, height: 48, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(255,255,255,0.04)", backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.15)",
              textDecoration: "none", transition: "transform 0.2s",
            }}>
            <GitBranch size={20} style={{ color: "var(--muted)" }} />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
