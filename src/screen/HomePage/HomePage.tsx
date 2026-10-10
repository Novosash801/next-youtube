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
    <div>
      <Image
        className={styles.videoImage}
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt="Видео с youtube"
        width={350}
        height={197}
        onError={() => setHasError(true)}
      />
      <div className={styles.videoInfoContainer}>
        <div className={styles.channelImage}>
          <p className={styles.hiddenText}>Название канала</p>
        </div>

        <div className={styles.videoInfo}>
          <p>Название видео</p>
          <p>Краткое описание</p>
        </div>
      </div>
    </div>
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
          <div className="div" key={videoId}>
            <VideoThumbnail videoId={videoId} />
            <Link href={`/video/${videoId}`} className={styles.link} />
          </div>
        ))
      ) : (
        <div>Нет видео</div>
      )}
    </div>
  );
};

export default HomePage;
