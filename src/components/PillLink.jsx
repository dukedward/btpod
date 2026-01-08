export default function PillLink({ href, label, sub }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        padding: "12px 14px",
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.10)",
        textDecoration: "none",
        color: "#E9ECFF",
        background: "rgba(255,255,255,0.04)",
      }}
    >
      <div>
        <div style={{ fontWeight: 700 }}>{label}</div>
        {sub ? (
          <div style={{ fontSize: 12, opacity: 0.75, marginTop: 2 }}>{sub}</div>
        ) : null}
      </div>
      <span style={{ opacity: 0.7 }}>↗</span>
    </a>
  );
}
