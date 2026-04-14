"use client";

const letters = [
  { char: "T", color: "#3178c6" },
  { char: "A", color: "#ff9900" },
  { char: "M", color: "#47a248" },
  { char: " ", color: "transparent" },
  { char: "P", color: "#336791" },
  { char: "H", color: "#e34f26" },
  { char: "A", color: "#a78bfa" },
  { char: "N", color: "#ffffff" },
];

export default function BrandName() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 1 }}>
      {letters.map((l, i) =>
        l.char === " " ? (
          <span key={i} style={{ width: 5 }} />
        ) : (
          <span
            key={i}
            style={{
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: "0.2em",
              color: l.color,
              opacity: 0.5,
            }}
          >
            {l.char}
          </span>
        )
      )}
    </div>
  );
}
