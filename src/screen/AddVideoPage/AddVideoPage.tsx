"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { parseYouTube } from "@/shared/libs";

import styles from "./AddVideoPage.module.css";

type Inputs = {
  videoUrl: string;
};

const schema = z.object({
  videoUrl: z.string().min(1, { message: "Поле не должно быть пустым" }),
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
    console.log(data);
    e.preventDefault();

    const input = e.currentTarget.elements.namedItem("video-url");
    const url = (input as HTMLInputElement | null)?.value ?? "";

    let parsedUrl: URL | null = null;

    try {
      parsedUrl = new URL(url);
    } catch (error) {
      console.error("error", error);
    }

    if (!parsedUrl) return;

    const videoId = parseYouTube(parsedUrl);

    if (!videoId) return;
    setVideoId(videoId);
  };

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
        <button className={styles.button} type="submit">
          Add Video
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
