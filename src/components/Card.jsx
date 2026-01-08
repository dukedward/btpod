import React from "react";

export default function Card({ children }) {
  return (
    <div
      style={{
        border: "1px solid rgba(124, 92, 255, 0.22)",
        background:
          "linear-gradient(180deg, rgba(124,92,255,0.10), rgba(0,0,0,0.00))",
        borderRadius: 18,
        padding: 18,
        boxShadow: "0 12px 40px rgba(0,0,0,.35)",
      }}
    >
      {children}
    </div>
  );
}
