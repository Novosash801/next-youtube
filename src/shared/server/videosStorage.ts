import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type VideoDataContent = {
  userId: string;
  id: string;
  categoryId: string;
};

const DB_PATH = path.join(process.cwd(), "data", "videos.json");

export async function readVideosData(): Promise<VideoDataContent[]> {
  const file = await readFile(DB_PATH, "utf-8");
  return JSON.parse(file);
}

export async function writeVideosData(videosData: VideoDataContent[]) {
  await writeFile(DB_PATH, JSON.stringify(videosData, null, 2));
}
