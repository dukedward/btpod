import { NextResponse } from "next/server";

export const revalidate = 300;

function withKey(url) {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) throw new Error("Missing YOUTUBE_API_KEY");
  const u = new URL(url);
  u.searchParams.set("key", key);
  return u.toString();
}

async function fetchJson(url) {
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`YouTube API error ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json();
}

async function getEmbeddableMap(ids) {
  if (!ids.length) return new Map();
  const url = withKey(
    `https://www.googleapis.com/youtube/v3/videos?part=status&id=${ids.join(
      ","
    )}`
  );
  const data = await fetchJson(url);
  const map = new Map();
  for (const it of data.items || []) map.set(it.id, !!it?.status?.embeddable);
  return map;
}

export async function GET(req) {
  try {
    const channelId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;
    if (!channelId) {
      return NextResponse.json(
        { ok: false, error: "Missing NEXT_PUBLIC_YOUTUBE_CHANNEL_ID" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(req.url);
    const name = (searchParams.get("name") || "").trim();
    if (!name)
      return NextResponse.json(
        { ok: false, error: "Missing name" },
        { status: 400 }
      );

    // Query strategy: search within your channel for cast name + clip-ish terms
    const q = `${name} basement talk clip shorts highlight`;
    const url = withKey(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&q=${encodeURIComponent(
        q
      )}&type=video&order=relevance&maxResults=12`
    );
    const data = await fetchJson(url);

    const items = (data.items || [])
      .map((it) => ({
        videoId: it?.id?.videoId,
        title: it?.snippet?.title || "",
        publishedAt: it?.snippet?.publishedAt || null,
        thumb:
          it?.snippet?.thumbnails?.high?.url ||
          it?.snippet?.thumbnails?.medium?.url ||
          it?.snippet?.thumbnails?.default?.url ||
          null,
      }))
      .filter((x) => !!x.videoId);

    const embeddable = await getEmbeddableMap(items.map((x) => x.videoId));
    const filtered = items.filter((x) => embeddable.get(x.videoId)).slice(0, 8);

    return NextResponse.json({ ok: true, name, items: filtered });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
