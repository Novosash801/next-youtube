export type VideoDto = {
  videoId: string;
  title: string | null;
  authorName: string | null;
  authorUrl: string | null;
};

export type AllVideosDto = {
  data: VideoDto[];
  ok: boolean;
};
