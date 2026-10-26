"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./HomePage.module.css";

type VideoThumbnailProps = {
  videoId: string;
  title: string | null;
  authorName: string | null;
};

const VideoThumbnail = ({ videoId, title, authorName }: VideoThumbnailProps) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={styles.placeholder}>
        <span>Видео недоступно</span>
      </div>
    );
  }

  return (
    <div className={styles.videoBlock} key={videoId}>
      <Link href={`/video/${videoId}`} className={styles.videoPreview}>
        <Image
          fill
          className={styles.videoImage}
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt="Видео с youtube"
          onError={() => setHasError(true)}
        />
      </Link>

      <div className={styles.videoInfoContainer}>
        <Link href="/channel" className={styles.channelImage}>
          <p className={styles.hiddenText}>
            {authorName ?? "Название канала"}
          </p>
        </Link>

        <div className={styles.videoInfo}>
          <Link href={`/video/${videoId}`} className={styles.videoTitleLink}>
            {title ?? "Название видео"}
          </Link>
          <Link href="/channel" className={styles.channelNameLink}>
            {authorName ?? "Название канала"}
          </Link>
        </div>
      </div>
      <Link href={`/video/${videoId}`} className={styles.link} />
    </div>
  );
};

type VideoData = {
  videoId: string;
  title: string | null;
  authorName: string | null;
};

const HomePage = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<VideoData[] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const serverData = await fetch("/api/videos");
        const response = await serverData.json();

        setData(response.data);
      } catch {
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className={styles.container}>
      {data && data.length > 0 ? (
        data.map(({ videoId, title, authorName }) => (
          <VideoThumbnail
            videoId={videoId}
            title={title}
            authorName={authorName}
            key={videoId}
          />
        ))
      ) : (
        <div>Нет видео</div>
      )}
    </div>
  );
};

export default HomePage;
