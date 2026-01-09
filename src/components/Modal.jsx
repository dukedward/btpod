"use client";

export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        background: "rgba(2,6,23,0.72)",
        display: "grid",
        placeItems: "center",
        padding: 16,
      }}
    >
      <div
        style={{
          width: "min(980px, 100%)",
          borderRadius: 20,
          border: "1px solid rgba(148,163,184,0.18)",
          background: "rgba(15,23,42,0.92)",
          boxShadow: "0 30px 120px rgba(0,0,0,.6)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 14px",
            borderBottom: "1px solid rgba(148,163,184,0.14)",
          }}
        >
          <div style={{ fontWeight: 900, color: "#f1f5f9" }}>{title}</div>
          <button
            onClick={onClose}
            style={{
              border: "1px solid rgba(148,163,184,0.20)",
              background: "rgba(148,163,184,0.10)",
              color: "#e2e8f0",
              borderRadius: 12,
              padding: "8px 10px",
              fontWeight: 900,
              cursor: "pointer",
            }}
          >
            Close ✕
          </button>
        </div>

        <div style={{ padding: 14 }}>{children}</div>
      </div>
    </div>
  );
}
