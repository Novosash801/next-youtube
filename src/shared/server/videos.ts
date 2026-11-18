import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { VideoDto } from "@/shared/types/serverTypes";

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

type VideoDataContent = {
  id: string;
  categoryId: string;
};

const DB_PATH = path.join(process.cwd(), "data", "videos.json");

async function readVideosData(): Promise<VideoDataContent[]> {
  const file = await readFile(DB_PATH, "utf-8");
  return JSON.parse(file);
}

async function writeVideosData(videosData: VideoDataContent[]) {
  await writeFile(DB_PATH, JSON.stringify(videosData, null, 2));
}

export async function getVideos(categoryIdParam?: string | null) {
  const videosData = await readVideosData();

  const videos = await Promise.all(
    videosData
      .filter(({ categoryId }) =>
        categoryIdParam ? categoryId === categoryIdParam : true,
      )
      .map(({ id, categoryId }) => fetchVideoInfo(id, categoryId)),
  );

  const categories = [
    ...new Set(videosData.map(({ categoryId }) => categoryId)),
  ];

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

export async function addVideo(videoId: string, categoryId: string) {
  const videosData = await readVideosData();

  if (videosData.some((video) => video.id === videoId)) {
    return false;
  }

  videosData.push({ id: videoId, categoryId });
  await writeVideosData(videosData);
  return true;
}

async function fetchVideoInfo(
  videoId: string,
  categoryId: string,
): Promise<VideoDto> {
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
