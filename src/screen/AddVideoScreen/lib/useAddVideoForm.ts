import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { isAllowedHost, parseYouTube, YOUTUBE_DOMAINS } from "@/shared/libs";

type Inputs = {
  videoUrl: string;
  videoCategory: string;
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

  videoCategory: z.string(),
});

export const useAddVideoForm = () => {
  const [videoId, setVideoId] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(schema) });

  const onSubmitHandler: SubmitHandler<Inputs> = async (data) => {
    const url = new URL(data.videoUrl);

    const videoId = parseYouTube(url);

    if (!videoId) return;
    setVideoId(videoId);

    await fetch("/api/videos", {
      method: "POST",
      body: JSON.stringify({ videoId, categoryId: data.videoCategory }),
    });
  };

  return {
    register,
    onSubmit: handleSubmit(onSubmitHandler),
    watch,
    errors,
    videoId,
    setVideoId,
  };
};
