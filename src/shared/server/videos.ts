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

const videosData = new Map<string, VideoDataContent>([
  ["7ZhdXgRfxHI", { id: "7ZhdXgRfxHI", categoryId: "nature" }],
  ["2g811Eo7K8U", { id: "2g811Eo7K8U", categoryId: "games" }],
  ["dQw4w9WgXcQ", { id: "dQw4w9WgXcQ", categoryId: "music" }],
  ["3JZ_D3ELwOQ", { id: "3JZ_D3ELwOQ", categoryId: "sport" }],
  ["L_jWHffIx5E", { id: "L_jWHffIx5E", categoryId: "movie" }],
  ["eY52Zsg-KVI", { id: "eY52Zsg-KVI", categoryId: "music" }],
  ["kJQP7kiw5Fk", { id: "kJQP7kiw5Fk", categoryId: "music" }],
  ["fRh_vgS2dFE", { id: "fRh_vgS2dFE", categoryId: "movie" }],
  ["RgKAFK5djSk", { id: "RgKAFK5djSk", categoryId: "sport" }],
  ["hT_nvWreIhg", { id: "hT_nvWreIhg", categoryId: "news" }],
]);

export async function getVideos() {
  const videos = await Promise.all(
    Array.from(videosData.values()).map(({ id, categoryId }) =>
      fetchVideoInfo(id, categoryId),
    ),
  );

  const categories = [...new Set(videos.map((video) => video.categoryId))];

  return { videos, categories };
}

export async function getVideoById(videoId: string) {
  const videoData = videosData.get(videoId);

  if (!videoData) {
    return null;
  }

  return fetchVideoInfo(videoData.id, videoData.categoryId);
}

export function addVideo(videoId: string, categoryId: string) {
  if (videosData.has(videoId)) {
    return false;
  }

  videosData.set(videoId, { id: videoId, categoryId });
  return true;
}

async function fetchVideoInfo(videoId: string, categoryId: string) {
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

    const videoInfo: OEmbedVideoInfo = await res.json();

    return {
      videoId,
      categoryId,
      title: videoInfo.title,
      authorName: videoInfo.author_name,
      authorUrl: videoInfo.author_url.split("/").at(-1) ?? null,
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
