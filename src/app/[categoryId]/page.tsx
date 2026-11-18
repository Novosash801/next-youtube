import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Видео в категории: ",
  description: "A simple youtube clone built with Next.js and TypeScript.",
};

type CategoryIdPageProps = {
  params: Promise<{ categoryId: string }>;
};

export default async function CategoryIdPage({ params }: CategoryIdPageProps) {
  const { categoryId } = await params;

  return <div></div>;
}
