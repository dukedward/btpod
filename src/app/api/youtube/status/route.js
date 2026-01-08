import { NextResponse } from "next/server";

export const revalidate = 60;

function withKey(url) {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) throw new Error("Missing YOUTUBE_API_KEY");
  const u = new URL(url);
  u.searchParams.set("key", key);
  return u.toString();
}

async function fetchJson(url) {
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`YouTube API error ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json();
}

async function getEmbeddableMap(videoIds) {
  if (!videoIds.length) return new Map();

  // videos.list returns status.embeddable
  const url = withKey(
    `https://www.googleapis.com/youtube/v3/videos?part=status&id=${videoIds.join(
      ","
    )}`
  );

  const data = await fetchJson(url);
  const map = new Map();

  for (const item of data.items || []) {
    map.set(item.id, !!item?.status?.embeddable);
  }
  return map;
}

async function pickFirstEmbeddable(items) {
  const ids = items.map((it) => it?.id?.videoId).filter(Boolean);

  const embeddable = await getEmbeddableMap(ids);

  for (const it of items) {
    const videoId = it?.id?.videoId;
    if (!videoId) continue;
    if (embeddable.get(videoId)) {
      return {
        videoId,
        title: it?.snippet?.title || null,
        publishedAt: it?.snippet?.publishedAt || null,
      };
    }
  }
  return null;
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

    // 1) LIVE candidates (grab up to 5)
    const liveUrl = withKey(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&maxResults=5`
    );
    const live = await fetchJson(liveUrl);
    const livePick = await pickFirstEmbeddable(live?.items || []);

    if (livePick) {
      return NextResponse.json({
        ok: true,
        isLive: true,
        videoId: livePick.videoId,
        title: livePick.title,
        publishedAt: livePick.publishedAt,
      });
    }

    // 2) Latest upload candidates (grab up to 10)
    const latestUrl = withKey(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=10`
    );
    const latest = await fetchJson(latestUrl);
    const latestPick = await pickFirstEmbeddable(latest?.items || []);

    return NextResponse.json({
      ok: true,
      isLive: false,
      videoId: latestPick?.videoId || null,
      title: latestPick?.title || null,
      publishedAt: latestPick?.publishedAt || null,
      note: latestPick ? null : "No embeddable videos found",
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
