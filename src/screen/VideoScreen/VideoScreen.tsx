import Link from "next/link";

import { VideoDto } from "@/shared/types/serverTypes";

import styles from "./VideoScreen.module.css";

type VideoScreenProps = {
  video: VideoDto;
};

const VideoScreen = ({ video }: VideoScreenProps) => {
  return (
    <div className={styles.container}>
      <iframe
        width={550}
        height={300}
        className={styles.iframe}
        key={video.videoId}
        src={`https://www.youtube.com/embed/${video.videoId}`}
        title={video.title ?? ""}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        frameBorder={0}
      />

      <b className={styles.videoTitle}>{video.title}</b>

      <div className={styles.videoInfoContainer}>
        <Link
          href={`/profile/${video.authorUrl}`}
          className={styles.channelImage}
        >
          <div className={styles.hiddenText}>{video.authorName}</div>
        </Link>

        <Link
          href={`/profile/${video.authorUrl}`}
          className={styles.channelNameLink}
        >
          {video.authorName}
        </Link>
      </div>
    </div>
  );
};

export default VideoScreen;
