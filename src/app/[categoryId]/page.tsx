type CategoryIdPageProps = {
  params: Promise<{ categoryId: string }>;
};

export default async function CategoryIdPage({ params }: CategoryIdPageProps) {
  const { categoryId } = await params;

  return <div>Видео с категорией {categoryId}</div>;
}
