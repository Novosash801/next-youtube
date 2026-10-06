import styles from "./VideoScreen.module.css";

type VideoScreenProps = {
  videoId: string;
};

const VideoScreen = ({ videoId }: VideoScreenProps) => {
  return (
    <div className={styles.video}>
      <iframe
        key={videoId}
        src={`https://www.youtube.com/embed/${videoId}`}
        title="44 года под домашним арестом."
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoScreen;
