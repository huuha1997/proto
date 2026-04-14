export default function Loading() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a0a0f",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        <span
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            color: "#67e8f9",
            fontFamily: "var(--font-geist-mono), monospace",
          }}
          className="animate-pulse"
        >
          TP
        </span>
        <div
          style={{
            width: "2rem",
            height: "2px",
            backgroundColor: "#67e8f9",
            borderRadius: "1px",
          }}
          className="animate-pulse"
        />
      </div>
    </div>
  );
}
