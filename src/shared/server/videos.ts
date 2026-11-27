import { VideoDto } from "@/shared/types/serverTypes";

import { readVideosData, writeVideosData } from "./videosStorage";

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

export async function getVideos(categoryIdParam?: string | null, userIdParam?: string | null) {
  const videosData = await readVideosData();

  const videos = await Promise.all(
    videosData
      .filter(({ categoryId }) => (categoryIdParam ? categoryId === categoryIdParam : true))
      .filter(({ userId }) => (userIdParam ? userId === userIdParam : true))
      .map(({ id, categoryId }) => fetchVideoInfo(id, categoryId)),
  );

  const categories = [...new Set(videosData.map(({ categoryId }) => categoryId))];

  return { videos, categories };
}

export async function getVideoById(videoId: string) {
  const videosData = await readVideosData();
  const videoData = videosData.find((video) => video.id === videoId);

  if (!videoData) {
    return null;
  }

  return fetchVideoInfo(videoData.id, videoData.categoryId);
}

export async function addVideo(userId: string, videoId: string, categoryId: string) {
  const videosData = await readVideosData();

  if (videosData.some((video) => video.id === videoId)) {
    return false;
  }

  videosData.push({ userId, id: videoId, categoryId });
  await writeVideosData(videosData);
  return true;
}

async function fetchVideoInfo(videoId: string, categoryId: string): Promise<VideoDto> {
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
    );

    if (!res.ok) {
      return {
        videoId,
        categoryId,
        title: null,
        authorName: null,
        authorUrl: null,
      };
    }

    const data: OEmbedVideoInfo = await res.json();

    return {
      videoId,
      categoryId,
      title: data.title,
      authorName: data.author_name,
      authorUrl: data.author_url.split("/").at(-1) ?? null,
    };
  } catch (error) {
    console.error(`oEmbed fetch failed for ${videoId}`, error);
    return {
      videoId,
      categoryId,
      title: null,
      authorName: null,
      authorUrl: null,
    };
  }
}
