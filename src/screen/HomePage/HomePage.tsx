"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./HomePage.module.css";

const HomePage = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<string[] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const serverData = await fetch("/api/videos");
        const response = await serverData.json();

        setData(response.data);
      } catch {
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className={styles.home}>
      {data && data.length > 0 ? (
        data.map((videoId) => (
          <Link key={videoId} href={`/video/${videoId}`}>
            <Image
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              key={videoId}
              alt="Видео с youtube"
              width={150}
              height={150}
            />
          </Link>
        ))
      ) : (
        <div>Нет видео</div>
      )}
    </div>
  );
};

export default HomePage;
