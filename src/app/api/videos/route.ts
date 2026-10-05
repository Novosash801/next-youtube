const videosData: Set<string> = new Set<string>();

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
