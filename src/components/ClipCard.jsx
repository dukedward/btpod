export default function ClipCard({ title, href, note }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="block rounded-2xl p-3.5 text-slate-200 border border-slate-700 bg-slate-900"
    >
      <div className="font-black text-base">{title}</div>
      {note ? (
        <div className="text-slate-300 mt-1.5 text-sm">{note}</div>
      ) : null}
      <div className="text-slate-400 mt-1.5 font-extrabold">Open ↗</div>
    </a>
  );
}
