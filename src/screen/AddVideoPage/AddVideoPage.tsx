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

type Schema = z.infer<typeof schema>;

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

    const res = (await fetch("/api/videos")).json();

    console.log("res", res);
  };

  const urlError = errors.videoUrl?.message;

  return (
    <div className={styles.video}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="video-url">Video URL:</label>
        <input
          className={styles.input}
          placeholder="link"
          type="text"
          {...register("videoUrl")}
        />

        {urlError && <p>{urlError}</p>}
        <button className={styles.button} type="submit">
          Загрузить
        </button>

        <button
          className={styles.button}
          type="reset"
          onClick={() => setVideoId("")}
        >
          Сбросить
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
