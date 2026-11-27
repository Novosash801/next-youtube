import { revalidatePath } from "next/cache";

import { addVideo, getVideoById, getVideos } from "@/shared/server/videos";

export async function GET(request: Request) {
  const urlObject = new URL(request.url);
  const videoIdParam = urlObject.searchParams.get("videoId");
  const categoryIdParam = urlObject.searchParams.get("categoryId");

  if (videoIdParam) {
    const video = await getVideoById(videoIdParam);

    if (!video) {
      return Response.json(
        { ok: false, error: "Видео не найдено" },
        { status: 404 },
      );
    }

    return Response.json({ ok: true, data: video });
  }

  const { videos, categories } = await getVideos(categoryIdParam);
  return Response.json({ ok: true, data: videos, categories });
}

export async function POST(request: Request) {
  const { userId, videoId, categoryId } = await request.json();

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

  if (!(await addVideo(userId, videoId, categoryId))) {
    return Response.json(
      { ok: false, error: "Видео уже добавлено" },
      { status: 400 },
    );
  }

  revalidatePath("/");

  return Response.json({ ok: true });
}
