'use client"';

import React from "react";

type MyVideosScreenProps = {
  userId: string;
};

import styles from "./MyVideoScreen.module.css";
const MyVideosScreen = ({ userId }: MyVideosScreenProps) => {
  return <div>Страница с моими видео</div>;
};

export default MyVideosScreen;
