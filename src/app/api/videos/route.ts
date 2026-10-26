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

export async function GET(request: Request) {
  const urlObject = new URL(request.url);
  const videoId = urlObject.searchParams.get("videoId");

  console.log("videoId", videoId);

  const promisesVideo = Array.from(videoIds).map(async (videoId) => {
    try {
      const data = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
      );

      if (!data.ok) {
        return { videoId, title: null, authorName: null };
      }

      const res = await data.json();

      return {
        videoId,
        title: res.title,
        authorName: res.author_name,
        authorUrl: res.author_url,
      };
    } catch {
      return { videoId, title: null, authorName: null };
    }
  });

  const videos = await Promise.all(promisesVideo);
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
