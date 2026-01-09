"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Modal from "./Modal";
import VideoGrid from "./VideoGrid";
import { CAST } from "@/lib/utils";

export default function CastAndClipsHub() {
  const [shorts, setShorts] = useState({
    loading: true,
    items: [],
    error: null,
  });

  const [castModal, setCastModal] = useState({
    open: false,
    name: "",
    loading: false,
    items: [],
    error: null,
  });

  const [player, setPlayer] = useState({
    open: false,
    title: "",
    videoId: null,
  });

  // Load Shorts
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/youtube/shorts");
        const data = await res.json();
        if (!data.ok) throw new Error(data.error || "Failed to load shorts");
        setShorts({ loading: false, items: data.items || [], error: null });
      } catch (e) {
        setShorts({ loading: false, items: [], error: e?.message || "Error" });
      }
    })();
  }, []);

  async function openCast(name) {
    setCastModal({ open: true, name, loading: true, items: [], error: null });
    try {
      const res = await fetch(
        `/api/youtube/cast?name=${encodeURIComponent(name)}`,
        {
          cache: "no-store",
        }
      );
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed to load cast clips");
      setCastModal({
        open: true,
        name,
        loading: false,
        items: data.items || [],
        error: null,
      });
    } catch (e) {
      setCastModal({
        open: true,
        name,
        loading: false,
        items: [],
        error: e?.message || "Error",
      });
    }
  }

  const playerSrc = useMemo(() => {
    if (!player.videoId) return null;
    return `https://www.youtube.com/embed/${player.videoId}?autoplay=0&mute=0&rel=0&modestbranding=1`;
  }, [player.videoId]);

  return (
    <>
      {/* CAST */}
      <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 12 }}>
        The Cast
      </div>

      <div className="grid grid-cols-4 gap-3">
        {CAST.map((c) => (
          <button
            key={c.name}
            onClick={() => openCast(c.name)}
            className="text-left relative border border-slate-700 bg-slate-900 rounded-2xl overflow-hidden cursor-pointer text-slate-200 p-4"
          >
            <div className="absolute top-2.5 right-3 font-black text-4xl text-slate-600 tracking-tight">
              {c.number}
            </div>

            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-700 basis-auto bg-slate-900">
                <Image
                  src={c.img}
                  alt={c.name}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>

              <div>
                <div className="font-black text-xl text-slate-200">
                  {c.name}
                </div>
                <div className="mt-1 text-sm font-bold tracking-wide text-slate-200">
                  {c.role.toUpperCase()}
                </div>
                {/* Clips */}
                <div className="mt-2.5 text-sm font-bold text-slate-500">
                  View Best Clips ↗
                </div>
              </div>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-2 gap-2.5 mt-3.5">
              {c.stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl px-2 py-2.5 bg-slate-850 border border-slate-700 text-center hover:bg-slate-700"
                >
                  <div className="text-xs uppercase tracking-wider text-slate-300">
                    {s.label}
                  </div>
                  <div className="mt-1 font-black text-base text-slate-200">
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          </button>
        ))}
      </div>

      {/* CLIPS (Shorts) */}
      <div className="mt-4 text-base font-black mb-3">
        Clips (YouTube Shorts)
      </div>

      {shorts.loading ? (
        <div className="text-slate-400">Loading Shorts…</div>
      ) : shorts.error ? (
        <div className="text-slate-400">
          <a
            href="https://www.youtube.com/@BasementTalkPod/shorts"
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-2.5 px-2.5 py-3 rounded-2xl border-slate-700 border bg-slate-900 text-slate-200"
          >
            View Shorts on YouTube ↗
          </a>
        </div>
      ) : shorts.items.length ? (
        <VideoGrid
          items={shorts.items}
          onPick={(v) =>
            setPlayer({
              open: true,
              title: v.title || "Clip",
              videoId: v.videoId,
            })
          }
        />
      ) : (
        <div className="text-slate-200">No Shorts found yet.</div>
      )}

      {/* CAST MODAL */}
      <Modal
        open={castModal.open}
        title={`${castModal.name} — Best Clips`}
        onClose={() =>
          setCastModal({
            open: false,
            name: "",
            loading: false,
            items: [],
            error: null,
          })
        }
      >
        {castModal.loading ? (
          <div className="text-slate-400">Loading clips…</div>
        ) : castModal.error ? (
          <div className="text-slate-400">{castModal.error}</div>
        ) : castModal.items.length ? (
          <VideoGrid
            items={castModal.items}
            onPick={(v) =>
              setPlayer({
                open: true,
                title: v.title || "Clip",
                videoId: v.videoId,
              })
            }
          />
        ) : (
          <div className="text-slate-400">
            No clips found yet for {castModal.name}.
          </div>
        )}
      </Modal>

      {/* PLAYER MODAL */}
      <Modal
        open={player.open}
        title={player.title || "Video"}
        onClose={() => setPlayer({ open: false, title: "", videoId: null })}
      >
        <div className="relative w-full pt-[56.25%] rounded-2xl overflow-hidden border border-slate-700 bg-slate-800">
          {playerSrc ? (
            <iframe
              title={player.title || "Player"}
              src={playerSrc}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          ) : null}
        </div>
      </Modal>

      <style>{`
        @media (max-width: 1000px) {
          div[style*="repeat(4"] { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 640px) {
          div[style*="repeat(2"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
