"use client";

import { useEffect, useMemo, useState } from "react";
import { LINKS } from "@/lib/utils";

export default function YouTubeAutoPlayer() {
  const [state, setState] = useState({
    loading: true,
    ok: true,
    isLive: false,
    videoId: null,
    title: null,
    error: null,
  });

  async function load() {
    try {
      const res = await fetch("/api/youtube/status", { cache: "force-cache" });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Status not ok");

      setState({
        loading: false,
        ok: true,
        isLive: !!data.isLive,
        videoId: data.videoId || null,
        title: data.title || null,
        error: null,
      });
    } catch (e) {
      setState((s) => ({
        ...s,
        loading: false,
        ok: false,
        error: e?.message || "Failed to load",
      }));
    }
  }

  useEffect(() => {
    load();
    const t = setInterval(load, 60_000); // refresh every 60 seconds
    return () => clearInterval(t);
  }, []);

  const src = useMemo(() => {
    if (!state.videoId) return null;
    const base = `https://www.youtube.com/embed/${state.videoId}`;
    return `${base}?autoplay=0&mute=0&rel=0&modestbranding=1`;
  }, [state.videoId]);

  return (
    <div>
      <div className="flex items-center gap-2.5 mb-2.5 flex-wrap">
        <div className="font-bold">
          {state.isLive ? "LIVE NOW" : "Latest Episode"}
        </div>

        {state.isLive ? (
          <span className="px-1 py-2.5 rounded-2xl border border-slate-700 text-slate-200 font-black text-sm tracking-wide">
            ● LIVE
          </span>
        ) : null}

        {state.title ? (
          <span className="text-slate-400 text-sm">{state.title}</span>
        ) : null}
      </div>

      <div className="relative w-full pt-[56.25%] rounded-2xl overflow-hidden border border-slate-700 bg-slate-800">
        {src ? (
          <iframe
            title={state.isLive ? "Basement Talk Live" : "Basement Talk Latest"}
            src={src}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute w-full h-full inset-0 border-0"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center p-4 text-center">
            <div>
              <div className="font-black text-base">
                {state.loading ? "Loading stream…" : "No video found yet"}
              </div>
              {state.ok === false ? (
                <div className="text-slate-600 mt-2 text-sm">{state.error}</div>
              ) : null}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2.5 flex-wrap mt-3">
        <a
          href="https://www.youtube.com/@BasementTalkPod/live"
          target="_blank"
          rel="noreferrer"
          className="px-2.5 py-3 rounded-2xl bg-slate-800 text-slate-200 font-bold hover:bg-slate-700"
        >
          YouTube Live Page ↗
        </a>

        <a
          href="https://www.youtube.com/@BasementTalkPod/videos"
          target="_blank"
          rel="noreferrer"
          className="px-2.5 py-3 rounded-2xl bg-slate-800 text-slate-200 font-bold hover:bg-slate-700"
        >
          Latest Videos ↗
        </a>
        <a
          href={LINKS.youtube}
          target="_blank"
          rel="noreferrer"
          className="px-3 py-3.5 border rounded-2xl bg-sky-400 text-slate-800 font-black border-sky-700 hover:bg-sky-600 hover:text-slate-200"
        >
          Watch on YouTube
        </a>
      </div>
    </div>
  );
}
