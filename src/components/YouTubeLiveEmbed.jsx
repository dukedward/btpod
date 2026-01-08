import { LINKS } from "@/lib/utils";

export default function YouTubeLiveEmbed() {
  const channelId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;

  // Best live embed format when you have channelId:
  // https://www.youtube.com/embed/live_stream?channel=UCxxxx
  const liveSrc = channelId
    ? `https://www.youtube.com/embed/live_stream?channel=${channelId}&autoplay=0&mute=0`
    : null;

  // Fallback: show channel page link + a basic channel embed style via "videoseries" isn't perfect.
  // We'll just render a clean CTA if channelId isn't set yet.
  return (
    <div>
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
        {liveSrc ? (
          <iframe
            title="Basement Talk Live"
            src={liveSrc}
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
              <div style={{ fontWeight: 800, fontSize: 18 }}>
                Set your Channel ID to enable the Live Embed
              </div>
              <div style={{ opacity: 0.75, marginTop: 8, fontSize: 13 }}>
                Add <code style={{ opacity: 0.9 }}>.env.local</code> with{" "}
                <code style={{ opacity: 0.9 }}>
                  NEXT_PUBLIC_YOUTUBE_CHANNEL_ID
                </code>
                .
              </div>
              <div style={{ marginTop: 14 }}>
                <a
                  href={LINKS.youtube}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-block",
                    padding: "10px 14px",
                    borderRadius: 14,
                    background: "#7C5CFF",
                    color: "#070A16",
                    fontWeight: 800,
                    textDecoration: "none",
                  }}
                >
                  Open YouTube Channel ↗
                </a>
              </div>
            </div>
          </div>
        )}
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
      </div>
      <div
        style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}
      ></div>

      <div style={{ marginTop: 10, opacity: 0.8, fontSize: 13 }}>
        If the player says unavailable, we’re probably offline — use the buttons
        below.
      </div>
    </div>
  );
}
