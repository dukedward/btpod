import Card from "@/components/Card";
import ClipCard from "@/components/ClipCard";
import PillLink from "@/components/PillLink";
import YouTubeAutoPlayer from "@/components/YouTubeAutoPlayer";
import YouTubeLiveEmbed from "@/components/YouTubeLiveEmbed";
import { LINKS, CAST, CLIPS } from "@/lib/utils";

export default function Page() {
  return (
    <main
      style={{ maxWidth: 1100, margin: "0 auto", padding: "26px 18px 60px" }}
    >
      {/* Top bar */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 14,
          flexWrap: "wrap",
          marginBottom: 18,
        }}
      >
        <div>
          <div style={{ opacity: 0.75, fontWeight: 700, letterSpacing: 0.4 }}>
            PRIME’S HOUSE PRESENTS
          </div>
          <h1 style={{ margin: "6px 0 0", fontSize: 34, letterSpacing: -0.4 }}>
            The Basement Talk Podcast
          </h1>
          <div style={{ marginTop: 8, opacity: 0.82 }}>
            Live on YouTube • Clips • Debate • Culture • Sports • Real talk.
          </div>
        </div>

        <a
          href={LINKS.youtube}
          target="_blank"
          rel="noreferrer"
          style={{
            padding: "12px 14px",
            borderRadius: 16,
            background: "#7C5CFF",
            color: "#070A16",
            fontWeight: 900,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          Watch Live ↗
        </a>
      </header>

      {/* Grid */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1.35fr 0.65fr",
          gap: 14,
        }}
      >
        <Card>
          <YouTubeAutoPlayer />
        </Card>

        <div style={{ display: "grid", gap: 14 }}>
          <Card>
            <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 10 }}>
              Listen On
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              <PillLink href={LINKS.spotify} label="Spotify" />
              <PillLink href={LINKS.apple} label="Apple Podcasts" />
              <PillLink href={LINKS.amazon} label="Amazon Music" />
              <PillLink href={LINKS.iheart} label="iHeartRadio" />
              <PillLink
                href={LINKS.google}
                label="Google Podcasts"
                sub="RSS feed"
              />
            </div>
          </Card>

          <Card>
            <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 10 }}>
              Follow
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              <PillLink href={LINKS.youtube} label="YouTube" />
              <PillLink href={LINKS.tiktok} label="TikTok" />
              <PillLink href={LINKS.instagram} label="Instagram" />
              <PillLink href={LINKS.twitter} label="X (Twitter)" />
              <PillLink href={LINKS.twitch} label="Twitch" />
            </div>
          </Card>
        </div>
      </section>

      {/* Cast */}
      <section style={{ marginTop: 14 }}>
        <Card>
          <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 12 }}>
            The Cast
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: 12,
            }}
          >
            {CAST.map((c) => (
              <div
                key={c.name}
                style={{
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: 16,
                  padding: 14,
                }}
              >
                <div style={{ fontWeight: 900, fontSize: 18 }}>{c.name}</div>
                <div style={{ opacity: 0.75, marginTop: 4 }}>{c.role}</div>
              </div>
            ))}
          </div>
          <div style={{ opacity: 0.75, marginTop: 12, fontSize: 13 }}>
            Want headshots + bios on each card? Drop 1 photo per person and the
            tone you want (funny, serious, sports vibe, etc.).
          </div>
        </Card>
      </section>

      {/* Clips */}
      <section style={{ marginTop: 14 }}>
        <Card>
          <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 12 }}>
            Clips
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: 12,
            }}
          >
            {CLIPS.map((c) => (
              <ClipCard
                key={c.title}
                title={c.title}
                href={c.href}
                note={c.note}
              />
            ))}
          </div>

          <div style={{ opacity: 0.75, marginTop: 12, fontSize: 13 }}>
            Want a real “clips gallery” here? If you tell me where you post
            clips most (TikTok vs Shorts), I can wire in an embed grid or a
            lightweight list that won’t slow the page down.
          </div>
        </Card>

        <style>{`
    @media (max-width: 920px) {
      section div[style*="repeat(3"] {
        grid-template-columns: 1fr !important;
      }
    }
  `}</style>
      </section>

      {/* Footer */}
      <footer
        style={{
          marginTop: 18,
          opacity: 0.75,
          fontSize: 13,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <div>
          © {new Date().getFullYear()} The Basement Talk • A Prime’s House
          Podcast
        </div>
        <a
          href="https://www.primeshouse.com"
          style={{ color: "#B9C2FF", textDecoration: "none" }}
        >
          Back to Prime’s House ↗
        </a>
      </footer>

      {/* Mobile tweak: stack columns */}
      <style>{`
        @media (max-width: 920px) {
          section[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
          section div[style*="repeat(4"] {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
      `}</style>
    </main>
  );
}
