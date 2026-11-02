type OEmbedVideoInfo = {
  title: string;
  author_name: string;
  author_url: string;
  type: string;
  height: number;
  width: number;
  version: string;
  provider_name: string;
  provider_url: string;
  thumbnail_height: number;
  thumbnail_width: number;
  thumbnail_url: string;
};

const videoIds: Set<string> = new Set<string>([
  "Cj3ENSVogTo",
  "2g811Eo7K8U",
  "dQw4w9WgXcQ",
  "3JZ_D3ELwOQ",
  "L_jWHffIx5E",
  "eY52Zsg-KVI",
  "kJQP7kiw5Fk",
  "fRh_vgS2dFE",
  "RgKAFK5djSk",
  "hT_nvWreIhg",
]);

async function fetchVideoInfo(videoId: string) {
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
    );

    if (!res.ok) {
      return { videoId, title: null, authorName: null, authorUrl: null };
    }

    const data: OEmbedVideoInfo = await res.json();
    
    return {
      videoId,
      title: data.title,
      authorName: data.author_name,
      authorUrl: data.author_url,
    };
  } catch (error) {
    console.error(`oEmbed fetch failed for ${videoId}`, error);
    return { videoId, title: null, authorName: null, authorUrl: null };
  }
}

export async function GET(request: Request) {
  const urlObject = new URL(request.url);
  const videoId = urlObject.searchParams.get("videoId");

  if (videoId) {
    if (!videoIds.has(videoId)) {
      return Response.json(
        { ok: false, error: "Видео не найдено" },
        { status: 404 },
      );
    }

    const video = await fetchVideoInfo(videoId);
    return Response.json({ ok: true, data: video });
  }

  const promisesVideos = Array.from(videoIds).map(fetchVideoInfo);
  const videos = await Promise.all(promisesVideos);

  return Response.json({ ok: true, data: videos });
}

export async function POST(request: Request) {
  const { videoId } = await request.json();

  if (videoIds.has(videoId)) {
    return Response.json(
      { ok: false, error: "Видео уже добавлено" },
      { status: 400 },
    );
  }

  videoIds.add(videoId);

  return Response.json({ ok: true });
}
