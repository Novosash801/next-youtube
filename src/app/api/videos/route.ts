const videosData: Set<string> = new Set<string>(['Cj3ENSVogTo', '2g811Eo7K8U', 'dQw4w9WgXcQ', '3JZ_D3ELwOQ', 'L_jWHffIx5E', 'eY52Zsg-KVI', 'kJQP7kiw5Fk', 'fRh_vgS2dFE', 'RgKAFK5djSk', 'hT_nvWreIhg']);

export async function GET() {
  return Response.json({ ok: true, data: Array.from(videosData) });
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
