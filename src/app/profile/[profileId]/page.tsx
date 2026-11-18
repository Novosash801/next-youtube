import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Профиль: ...",
};

type ProfileIdPageProps = {
  params: Promise<{ profileId: string }>;
};

async function ProfileIdPage({ params }: ProfileIdPageProps) {
  const { profileId } = await params;
  return <div>ProfileId: {profileId}</div>;
}

export default ProfileIdPage;
