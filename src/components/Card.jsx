import React from "react";

export default function Card({ children }) {
  return (
    <div className="p-4.5 border bg-slate-950 border-slate-700 shadow-lg rounded-2xl">
      {children}
    </div>
  );
}
