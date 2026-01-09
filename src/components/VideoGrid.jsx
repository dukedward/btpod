export default function VideoGrid({ items, onPick }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
      {items.map((v) => (
        <button
          key={v.videoId}
          onClick={() => onPick(v)}
          className="text-left border border-slate-700 bg-slate-900 rounded-2xl p-2.5 cursor-pointer text-slate-200 hover:bg-slate-800"
        >
          <div className="border rounded-xl overflow-hidden border-slate-700 bg-slate-800">
            {/* thumb */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={v.thumb || ""}
              alt={v.title || "video"}
              className="w-full block aspect-video object-cover"
            />
          </div>
          <div className="text-sm mt-2 font-black">{v.title || "Untitled"}</div>
          <div className="text-xs mt-1.5 font-bold text-slate-500">Play ▶</div>
        </button>
      ))}
    </div>
  );
}
