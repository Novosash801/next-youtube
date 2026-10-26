"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { isAllowedHost, parseYouTube, YOUTUBE_DOMAINS } from "@/shared/libs";

import styles from "./AddVideoPage.module.css";

type Inputs = {
  videoUrl: string;
};

const schema = z.object({
  videoUrl: z
    .string()
    .min(1, { message: "Поле не должно быть пустым" })
    .superRefine(async (url, ctx) => {
      let parsedUrl: URL;

      try {
        parsedUrl = new URL(url);
      } catch {
        ctx.addIssue({
          code: "custom",
          message: "Поле должно содержать ссылку",
          input: url,
        });
        return;
      }

      if (!isAllowedHost(parsedUrl.host, YOUTUBE_DOMAINS)) {
        ctx.addIssue({
          code: "custom",
          message: "Ссылка не на YouTube видео",
          input: url,
        });
      }
    }),
});

// type Schema = z.infer<typeof schema>;

const AddVideoPage = () => {
  const [videoId, setVideoId] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const url = new URL(data.videoUrl);

    const videoId = parseYouTube(url);

    if (!videoId) return;
    setVideoId(videoId);

    await fetch("/api/videos", {
      method: "POST",
      body: JSON.stringify({ videoId }),
    });

    const res = await fetch("/api/videos");
    const videos = await res.json();


  };

  const urlErrorMessage = errors.videoUrl?.message;

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h4>Ссылка на видео</h4>
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

export default AddVideoPage;
