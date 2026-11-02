"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  GetAllVideosDto,
  GetOneVideoDto,
  VideoDto,
} from "@/shared/types/serverTypes";

import styles from "./VideoPage.module.css";

type VideoScreenProps = {
  videoId: string;
};

const VideoScreen = ({ videoId }: VideoScreenProps) => {
  const [isLoading, setLoading] = useState(true);
  const [video, setVideo] = useState<GetOneVideoDto["data"] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const serverData = await fetch(`/api/videos?videoId=${videoId}`);
        const response = (await serverData.json()) as GetOneVideoDto;

        console.log("response", response);

        if (response.data) {
          setVideo(response.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [videoId]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className={styles.container}>
      <iframe
        width={550}
        height={300}
        className={styles.iframe}
        key={videoId}
        src={`https://www.youtube.com/embed/${videoId}`}
        title="44 года под домашним арестом."
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        frameBorder={0}
      />

      <b className={styles.videoTitle}>{video?.title}</b>

      <div className={styles.videoInfoContainer}>
        <Link
          href={`/profile/${video?.authorUrl}`}
          className={styles.channelImage}
        >
          <div className={styles.hiddenText}>{video?.authorName}</div>
        </Link>

        <Link
          href={`/profile/${video?.authorUrl}`}
          className={styles.channelNameLink}
        >
          {video?.authorName}
        </Link>
      </div>
    </div>
  );
};

export default VideoScreen;
