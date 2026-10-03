"use client";

import { useState } from "react";
import styles from "./AddVideoPage.module.css";
const AddVideoPage = () => {
  const [videoUrl, setVideoUrl] = useState("");
  return (
    <div className={styles.video}>
      <form
        onSubmit={(e) => {
          const url = e.target.elements[0].value;
          setVideoUrl(url);
          e.preventDefault();
        }}
      >
        <label htmlFor="video-url">Video URL:</label>
        <input
          className={styles.input}
          placeholder="Ссылка на видео"
          type="text"
          id="video-url"
          name="video-url"
        />
        <button className={styles.button} type="submit">
          Add Video
        </button>
      </form>
      {videoUrl && (
        <iframe
          width="1491"
          height="839"
          src="https://www.youtube.com/embed/jpHwjM8uHvA"
          title="44 года под домашним арестом."
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default AddVideoPage;
