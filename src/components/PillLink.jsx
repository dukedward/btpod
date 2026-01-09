export default function PillLink({ href, label, sub }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-between gap-3 px-3.5 py-3 rounded-xl border border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800"
    >
      <div>
        <div className="font-bold">{label}</div>
        {sub ? <div className="mt-3 text-slate-600 text-sm">{sub}</div> : null}
      </div>
      <span className="text-slate-400">↗</span>
    </a>
  );
}
