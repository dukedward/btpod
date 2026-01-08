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
      const res = await fetch("/api/youtube/status", { cache: "no-store" });
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 10,
          flexWrap: "wrap",
        }}
      >
        <div style={{ fontWeight: 900 }}>
          {state.isLive ? "LIVE NOW" : "Latest Episode"}
        </div>

        {state.isLive ? (
          <span
            style={{
              padding: "4px 10px",
              borderRadius: 999,
              background: "rgba(255,0,0,0.18)",
              border: "1px solid rgba(255,0,0,0.35)",
              color: "#FFD1D1",
              fontWeight: 900,
              fontSize: 12,
              letterSpacing: 0.4,
            }}
          >
            ● LIVE
          </span>
        ) : null}

        {state.title ? (
          <span style={{ opacity: 0.75, fontSize: 13 }}>{state.title}</span>
        ) : null}
      </div>

      <div
        style={{
          position: "relative",
          width: "100%",
          paddingTop: "56.25%",
          borderRadius: 18,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.10)",
          background: "rgba(0,0,0,0.35)",
        }}
      >
        {src ? (
          <iframe
            title={state.isLive ? "Basement Talk Live" : "Basement Talk Latest"}
            src={src}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: 0,
            }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
              padding: 18,
              textAlign: "center",
            }}
          >
            <div>
              <div style={{ fontWeight: 900, fontSize: 16 }}>
                {state.loading ? "Loading stream…" : "No video found yet"}
              </div>
              {state.ok === false ? (
                <div style={{ opacity: 0.8, marginTop: 8, fontSize: 13 }}>
                  {state.error}
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>

      <div
        style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}
      >
        <a
          href="https://www.youtube.com/@BasementTalkPod/live"
          target="_blank"
          rel="noreferrer"
          style={{
            padding: "10px 12px",
            borderRadius: 14,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#E9ECFF",
            fontWeight: 800,
            textDecoration: "none",
          }}
        >
          YouTube Live Page ↗
        </a>

        <a
          href="https://www.youtube.com/@BasementTalkPod/videos"
          target="_blank"
          rel="noreferrer"
          style={{
            padding: "10px 12px",
            borderRadius: 14,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#E9ECFF",
            fontWeight: 800,
            textDecoration: "none",
          }}
        >
          Latest Videos ↗
        </a>
      </div>
      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          marginTop: 12,
        }}
      >
        <a
          href={LINKS.youtube}
          target="_blank"
          rel="noreferrer"
          style={{
            padding: "10px 12px",
            borderRadius: 14,
            background: "#7C5CFF",
            color: "#070A16",
            fontWeight: 900,
            textDecoration: "none",
          }}
        >
          Watch on YouTube
        </a>
        <a
          href={LINKS.twitch}
          target="_blank"
          rel="noreferrer"
          style={{
            padding: "10px 12px",
            borderRadius: 14,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#E9ECFF",
            fontWeight: 800,
            textDecoration: "none",
          }}
        >
          Twitch ↗
        </a>
        <a
          href={LINKS.instagram}
          target="_blank"
          rel="noreferrer"
          style={{
            padding: "10px 12px",
            borderRadius: 14,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#E9ECFF",
            fontWeight: 800,
            textDecoration: "none",
          }}
        >
          Instagram ↗
        </a>
      </div>
    </div>
  );
}
