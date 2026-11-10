"use client";

import { useAddVideoForm } from "@/screen/AddVideoScreen/lib/useAddVideoForm";

import styles from "./AddVideoScreen.module.css";

const CATEGORIES = [
  { id: 1, title: "Игры" },
  { id: 2, title: "Новости" },
  { id: 3, title: "Юмор" },
  { id: 4, title: "Наука" },
  { id: 5, title: "Спорт" },
  { id: 6, title: "Природа" },
];

const AddVideoScreen = () => {
  const { register, onSubmit, errors, videoId, setVideoId } = useAddVideoForm();

  const urlErrorMessage = errors.videoUrl?.message;

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <select {...register("videoCategory")}>
          {CATEGORIES.map((category, index) => (
            <option value={category.title} key={category.id}>
              {category.title}
            </option>
          ))}
        </select>
        <label className={styles.label} htmlFor="video-url">
          <input
            className={styles.input}
            placeholder="ссылка на YouTube"
            type="text"
            {...register("videoUrl")}
          />
          <button className={styles.submitButton} type="submit">
            Загрузить
          </button>
          <button
            className={styles.resetButton}
            type="reset"
            onClick={() => setVideoId("")}
          >
            Сбросить
          </button>
          {urlErrorMessage && (
            <p className={styles.errorMessage}>{urlErrorMessage}</p>
          )}
        </label>
      </form>

      {videoId && (
        <iframe
          className={styles.player}
          src={`https://www.youtube.com/embed/${videoId}`}
          title="44 года под домашним арестом."
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default AddVideoScreen;
