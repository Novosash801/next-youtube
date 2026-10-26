"use client";

import { useEffect } from "react";
import Link from "next/link";

import { AllVideosDto, VideoDto } from "@/shared/types/serverTypes";

import styles from "./VideoPage.module.css";

type VideoScreenProps = {
  videoId: string;
};

const VideoScreen = ({ videoId }: VideoScreenProps) => {
  useEffect(() => {
    (async () => {
      try {
        const serverData = await fetch(`/api/videos?videoId=${videoId}`);
        const response = (await serverData.json()) as VideoDto;

        setData(response.data);
      } catch {
      } finally {
        setLoading(false);
      }
    })();
  }, [videoId]);

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

      <b className={styles.videoTitle}>НАЗВАНИЕ ВИДЕО</b>

      <div className={styles.videoInfoContainer}>
        <Link href="/channel" className={styles.channelImage}>
          <div className={styles.hiddenText}></div>
        </Link>

        <Link href="/" className={styles.channelNameLink}>
          НАЗВАНИЕ ВИДЕО
        </Link>
      </div>
    </div>
  );
};

export default VideoScreen;
