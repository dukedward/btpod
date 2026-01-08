export default function ClipCard({ title, href, note }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        display: "block",
        borderRadius: 16,
        padding: 14,
        textDecoration: "none",
        color: "#E9ECFF",
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(255,255,255,0.03)",
      }}
    >
      <div style={{ fontWeight: 900, fontSize: 16 }}>{title}</div>
      {note ? (
        <div style={{ opacity: 0.75, marginTop: 6, fontSize: 13 }}>{note}</div>
      ) : null}
      <div style={{ opacity: 0.7, marginTop: 10, fontWeight: 800 }}>Open ↗</div>
    </a>
  );
}
