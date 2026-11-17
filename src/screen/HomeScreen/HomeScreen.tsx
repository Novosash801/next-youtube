"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import UnavailableVideo from "@/shared/assets/img/unavailable_video.pimporimport { GetAllVideosDto } from "@/shared/types/serverTypes";

import styles from "./HomeScreen.module.css";

type VideoThumbnailProps = {
  videoId: string;
  title: string | null;
  authorName: string | null;
  authorUrl: string | null;
};

type VideoData = {
  videoId: string;
  title: string | null;
  authorName: string | null;
};

type HomeScreenProp = {
  vdata: GetAllVideosDto["data"];e
};

const HomeScreen = ({datas }: HomeScreenProp) => {  console.log("data", data);

  return (
    <div className={styles.container}>
     {/*  {data.categories.length > 0 &&
        categories.map((category, index) => {
          return (
            <div className="" key={index}>
              {category}
            </div>
          );
        }) */}}

      <div className={styles.videoGrid}>
        datas &&datas.length > 0 ? (
         datas.map(({ videoId, title, authorName, authorUrl }) => (
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
  <div>Нет видео</div>
        )}
      </div>
  <div>Нет видео</div>
        )}
      </div>
    </div>
  );
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
          unoptimized
        />
      </Link>

      <div className={styles.videoInfoContainer}>
        <Link href={`/profile/${authorUrl}`} className={styles.channelImage}>
          <div className={styles.hiddenText}>
            {authorName ?? "Название канала"}
          </div>
        </Link>

        <div className={styles.videoInfo}>
          <Link href={`/video/${videoId}`} className={styles.videoTitleLink}>
            <b>{title ?? "Название видео"}</b>
          </Link>

          <Link
            href={`/profile/${authorUrl}`}
            className={styles.channelNameLink}
          >
            {authorName ?? "Название канала"}
          </Link>
        </div>
      </div>
      <Link href={`/video/${videoId}`} className={styles.link} />
    </div>
  );
};

export default HomeScreen;
