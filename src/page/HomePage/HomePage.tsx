"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import UnavailableVideo from "@/shared/assets/img/unavailable_video.png";
import { GetAllVideosDto } from "@/shared/types/serverTypes";

import styles from "./HomePage.module.css";

type VideoThumbnailProps = {
  videoId: string;
  title: string | null;
  authorName: string | null;
  authorUrl: string | null;
};

const VideoThumbnail = ({
  videoId,
  title,
  authorName,
  authorUrl,
}: VideoThumbnailProps) => {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  if (hasError) {
    return (
      <div className={styles.placeholder}>
        <Link href="/not-found" className={styles.placeholderLink}>
          <Image className={styles.errorIcon} src={UnavailableVideo} alt="" />
          <b>Видео недоступно</b>
          <b>ID: {errorMessage}</b>
        </Link>
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
          onError={() => {
            setHasError(true);
            setErrorMessage(videoId);
          }}
        />
      </Link>

      <div className={styles.videoInfoContainer}>
        <Link href={`${authorUrl}`} className={styles.channelImage}>
          <div className={styles.hiddenText}>
            {authorName ?? "Название канала"}
          </div>
        </Link>

        <div className={styles.videoInfo}>
          <Link href={`/video/${videoId}`} className={styles.videoTitleLink}>
            <b>{title ?? "Название видео"}</b>
          </Link>

          <Link href={`${authorUrl}`} className={styles.channelNameLink}>
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
  const [data, setData] = useState<GetAllVideosDto["data"] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const serverData = await fetch("/api/videos");
        const response = (await serverData.json()) as GetAllVideosDto;

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
        data.map(({ videoId, title, authorName, authorUrl }) => (
          <VideoThumbnail
            videoId={videoId}
            title={title}
            authorName={authorName}
            key={videoId}
            authorUrl={authorUrl}
          />
        ))
      ) : (
        <div>Нет видео</div>
      )}
    </div>
  );
};

export default HomePage;
