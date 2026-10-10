"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./HomePage.module.css";

type VideoThumbnailProps = {
  videoId: string;
};

const VideoThumbnail = ({ videoId }: VideoThumbnailProps) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={styles.placeholder}>
        <span>Видео недоступно</span>
      </div>
    );
  }

  return (
    <>
      <Link href="/preview" className={styles.videoPreview}>
        <Image
          fill
          className={styles.videoImage}
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt="Видео с youtube"
          onError={() => setHasError(true)}
        />
      </Link>

      <div className={styles.videoInfoContainer}>
        <Link href={`/video/${videoId}`} className={styles.channelImage}>
          <p className={styles.hiddenText}>Название канала</p>
        </Link>

        <div className={styles.videoInfo}>
          <Link href={`/video/${videoId}`} className={styles.videoTitleLink}>
            Название видео
          </Link>
          <Link href="/channel" className={styles.channelNameLink}>
            Название канала
          </Link>
        </div>
      </div>
      <Link href={`/video/${videoId}`} className={styles.link} />
    </>
  );
};

const HomePage = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<string[] | null>(null);

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
        data.map((videoId) => (
          <div className={styles.videoBlock} key={videoId}>
            <VideoThumbnail videoId={videoId} />
          </div>
        ))
      ) : (
        <div>Нет видео</div>
      )}
    </div>
  );
};

export default HomePage;
