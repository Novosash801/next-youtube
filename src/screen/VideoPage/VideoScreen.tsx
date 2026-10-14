import Link from "next/link";

import styles from "./VideoScreen.module.css";

type VideoScreenProps = {
  videoId: string;
};

const VideoScreen = ({ videoId }: VideoScreenProps) => {
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

      <b className={styles.videoTitle}>Название видео</b>

      <div className={styles.videoInfoContainer}>
        <Link href="/" className={styles.channelImage}>
          <div className={styles.hiddenText}>Название канала</div>
        </Link>

        <Link href="/" className={styles.channelNameLink}>
          Название канала
        </Link>
      </div>
    </div>
  );
};

export default VideoScreen;
