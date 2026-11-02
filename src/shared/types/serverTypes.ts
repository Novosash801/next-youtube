export type VideoDto = {
  videoId: string;
  title: string | null;
  authorName: string | null;
  authorUrl: string | null;
};

export type GetOneVideoDto = {
  ok: boolean,
  data: VideoDto | null
}

export type GetAllVideosDto = {
   ok: boolean;
  data: VideoDto[];
 
};
