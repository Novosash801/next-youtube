const videosData: Set<string> = new Set<string>([
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

export async function GET() {
  const data = await Promise.all(
    Array.from(videosData).map(async (videoId) => {
      try {
        const res = await fetch(
          `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
        );

        if (!res.ok) {
          return { videoId, title: null, authorName: null };
        }

        const { title, author_name: authorName } = await res.json();

        return { videoId, title, authorName };
      } catch {
        return { videoId, title: null, authorName: null };
      }
    }),
  );

  return Response.json({ ok: true, data });
}

export async function POST(request: Request) {
  const { videoId } = await request.json();

  if (videosData.has(videoId)) {
    return Response.json(
      { ok: false, error: "Видео уже добавлено" },
      { status: 400 },
    );
  }

  videosData.add(videoId);

  return Response.json({ ok: true });
}
