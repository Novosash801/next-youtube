"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { is, ur } from "zod/v4/locales";

import { isAllowedHost, parseYouTube, YOUTUBE_DOMAINS } from "@/shared/libs";

import styles from "./AddVideoPage.module.css";

type Inputs = {
  videoUrl: string;
};

const schema = z.object({
  videoUrl: z
    .string()
    .min(1, { message: "Поле не должно быть пустым" })
    // .refine(async (url) => {
    //   const value = new URL(url);
    //   return isAllowedHost(value.host, YOUTUBE_DOMAINS);
    // }, "Ссылка должна быть на YouTube-видео")
    .superRefine(async (url, ctx) => {
      let parsedUrl: URL;
      try {
        parsedUrl = new URL(url);
      } catch (error) {
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
          message: "Поле должно содержать ссылку",
          input: url,
        });
      }
    }),
});

type Schema = z.infer<typeof schema>;

const AddVideoPage = () => {
  const [videoId, setVideoId] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(schema) });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const url = new URL(data.videoUrl);

    const videoId = parseYouTube(url);

    if (!videoId) return;
    setVideoId(videoId);
  };

  const urlError = errors.videoUrl?.message;

  return (
    <div className={styles.video}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="video-url">Video URL:</label>
        <input
          className={styles.input}
          placeholder="Ссылка на Youtube видео"
          type="text"
          {...register("videoUrl")}
        />

        {urlError && <p>Ошибка при поиске видео: {urlError}</p>}
        <button className={styles.button} type="submit">
          Загрузить
        </button>
      </form>
      {videoId && (
        <iframe
          width="1491"
          height="839"
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
