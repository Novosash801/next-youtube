import { addVideo, getVideoById, getVideos } from "@/shared/server/videos";

export async function GET(request: Request) {
  const urlObject = new URL(request.url);
  const videoId = urlObject.searchParams.get("videoId");

  if (videoId) {
    const video = await getVideoById(videoId);

    if (!video) {
      return Response.json(
        { ok: false, error: "Видео не найдено" },
        { status: 404 },
      );
    }

    return Response.json({ ok: true, data: video });
  }

  const videos = await getVideos();
  return Response.json({ ok: true, data: videos, categories: videos });
}

export async function POST(request: Request) {
  const { videoId, categoryId } = await request.json();

  if (typeof videoId !== "string" || videoId.length === 0) {
    return Response.json(
      { ok: false, error: "Некорректный ID видео" },
      { status: 400 },
    );
  }

  if (typeof categoryId !== "string" || categoryId.length === 0) {
    return Response.json(
      { ok: false, error: "Некорректная категория видео" },
      { status: 400 },
    );
  }

  if (!addVideo(videoId, categoryId)) {
    return Response.json(
      { ok: false, error: "Видео уже добавлено" },
      { status: 400 },
    );
  }

  return Response.json({ ok: true });
}
