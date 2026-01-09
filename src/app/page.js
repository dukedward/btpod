import Card from "@/components/Card";
import ClipCard from "@/components/ClipCard";
import PillLink from "@/components/PillLink";
import YouTubeAutoPlayer from "@/components/YouTubeAutoPlayer";
import CastAndClipsHub from "@/components/CastAndClipsHub";
import { LINKS, CAST, CLIPS } from "@/lib/utils";

export default function Page() {
  return (
    <main className="max-w-6xl my-0 mx-auto pt-6 px-4.5 pb-14.5">
      {/* Top bar */}
      <header className="flex items-center justify-between gap-3.5 flex-wrap mb-5">
        <div>
          <div className=" font-bold tracking-wide opacity-75 ">
            PRIME’S HOUSE PRESENTS
          </div>
          <h1 className=" tracking-tight mx-1.5 text-4xl ">
            The Basement Talk Podcast
          </h1>
          <div className=" mt-2 opacity-85 ">
            Live on YouTube • Clips • Debate • Culture • Sports • Real talk.
          </div>
        </div>

        <div className="flex items-center justify-center flex-wrap gap-3.5">
          <a
            href={LINKS.youtube}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-3.5 border rounded-2xl bg-sky-600 text-slate-800 font-black border-sky-700 hover:bg-sky-400"
          >
            Watch Live ↗
          </a>
          <a
            href={LINKS.shop}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-3.5 border rounded-2xl bg-sky-600 text-slate-800 font-black border-sky-700 hover:bg-sky-400"
          >
            Shop Basement Talk ↗
          </a>
        </div>
      </header>

      {/* Grid */}
      <section
        className="grid gap-3.5"
        style={{
          gridTemplateColumns: "1.35fr 0.65fr",
        }}
      >
        <Card>
          <YouTubeAutoPlayer />
        </Card>

        <div className="grid gap-3.5">
          <Card>
            <div className="text-lg mb-2.5 font-black">Listen On</div>
            <div className="grid gap-2.5">
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
            <div className="text-lg mb-2.5 font-black">Follow</div>
            <div className="grid gap-2.5">
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
      <section className="mt-3.5">
        <Card>
          <CastAndClipsHub />
        </Card>
      </section>

      {/* Clips */}
      <section className="mt-3.5">
        <Card>
          <div className="text-lg mb-3 font-black">Clips</div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {CLIPS.map((c) => (
              <ClipCard
                key={c.title}
                title={c.title}
                href={c.href}
                note={c.note}
              />
            ))}
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="mt-4.5 text-sm flex justify-between flex-wrap gap-2.5 text-slate-500">
        <div>
          © {new Date().getFullYear()} The Basement Talk • A Prime’s House
          Podcast
        </div>
        <a href="https://www.primeshouse.com" className="text-slate-300">
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
