import { NextResponse } from "next/server";

export const revalidate = 1800; // 30 minutes

function withKey(url) {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) throw new Error("Missing YOUTUBE_API_KEY");
  const u = new URL(url);
  u.searchParams.set("key", key);
  return u.toString();
}

async function fetchJson(url) {
  const res = await fetch(url, { next: { revalidate: 1800 } });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`YouTube API error ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json();
}

// Parse ISO8601 duration like "PT59S", "PT1M2S"
function parseISODurationSeconds(iso) {
  const m = iso.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
  if (!m) return null;
  const h = Number(m[1] || 0);
  const min = Number(m[2] || 0);
  const s = Number(m[3] || 0);
  return h * 3600 + min * 60 + s;
}

async function getVideoDetails(ids) {
  if (!ids.length) return [];
  const url = withKey(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,status&id=${ids.join(
      ","
    )}`
  );
  const data = await fetchJson(url);
  return data.items || [];
}

export async function GET() {
  try {
    const channelId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;
    if (!channelId) {
      return NextResponse.json(
        { ok: false, error: "Missing NEXT_PUBLIC_YOUTUBE_CHANNEL_ID" },
        { status: 500 }
      );
    }

    // Pull recent videos; we’ll filter down to Shorts-like ones
    const searchUrl = withKey(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=25`
    );
    const search = await fetchJson(searchUrl);

    const candidates = (search.items || [])
      .map((it) => ({
        videoId: it?.id?.videoId,
        title: it?.snippet?.title || "",
        description: it?.snippet?.description || "",
        publishedAt: it?.snippet?.publishedAt || null,
        thumb:
          it?.snippet?.thumbnails?.high?.url ||
          it?.snippet?.thumbnails?.medium?.url ||
          it?.snippet?.thumbnails?.default?.url ||
          null,
      }))
      .filter((x) => !!x.videoId);

    const ids = candidates.map((c) => c.videoId);
    const details = await getVideoDetails(ids);

    const detailMap = new Map(details.map((d) => [d.id, d]));

    // Shorts-like filter:
    // - embeddable
    // - duration <= 60s
    // - AND (title/desc has "short" / "#shorts" OR it’s simply <= 60s)
    const shorts = candidates
      .map((c) => {
        const d = detailMap.get(c.videoId);
        const embeddable = !!d?.status?.embeddable;
        const dur = parseISODurationSeconds(d?.contentDetails?.duration || "");
        const t = (c.title || "").toLowerCase();
        const desc = (c.description || "").toLowerCase();
        const looksLikeShort =
          t.includes("short") ||
          desc.includes("#short") ||
          desc.includes("#shorts") ||
          desc.includes("shorts");

        return {
          ...c,
          embeddable,
          durationSec: dur,
          looksLikeShort,
        };
      })
      .filter((x) => x.embeddable)
      .filter((x) => typeof x.durationSec === "number" && x.durationSec <= 60)
      // Keep ones that look like shorts first, but still allow <=60s
      .sort((a, b) => Number(b.looksLikeShort) - Number(a.looksLikeShort))
      .slice(0, 12);

    return NextResponse.json({ ok: true, items: shorts });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
