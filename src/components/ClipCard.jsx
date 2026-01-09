export default function ClipCard({ title, href, note }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="block rounded-2xl p-3.5 text-slate-200 border border-slate-700 bg-slate-800"
    >
      <div className="font-black text-base">{title}</div>
      {note ? (
        <div className="text-slate-500 mt-1.5 text-sm">{note}</div>
      ) : null}
      <div className="text-slate-600 mt-1.5 font-extrabold">Open ↗</div>
    </a>
  );
}
