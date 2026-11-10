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
  ["dQw4w9WgXcQ", { id: "dQw4w9WgXcQ", categoryId: "science" }],
  ["3JZ_D3ELwOQ", { id: "3JZ_D3ELwOQ", categoryId: "sport" }],
  ["L_jWHffIx5E", { id: "L_jWHffIx5E", categoryId: "sport" }],
  ["eY52Zsg-KVI", { id: "eY52Zsg-KVI", categoryId: "humor" }],
  ["kJQP7kiw5Fk", { id: "kJQP7kiw5Fk", categoryId: "humor" }],
  ["fRh_vgS2dFE", { id: "fRh_vgS2dFE", categoryId: "sport" }],
  ["RgKAFK5djSk", { id: "RgKAFK5djSk", categoryId: "sport" }],
  ["hT_nvWreIhg", { id: "hT_nvWreIhg", categoryId: "news" }],
]);

async function fetchVideoInfo(videoId: string, categoryId: string) {
  try {
    const categories: string[] = [];

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

    if (!categories.includes(categoryId)) {
      categories.push(categoryId);
    }

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

export async function getVideos() {
  return Promise.all(
    Array.from(videosData.values()).map(({ id, categoryId }) =>
      fetchVideoInfo(id, categoryId),
    ),
  );
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
