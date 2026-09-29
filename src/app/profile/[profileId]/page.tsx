type ProfileIdPageProps = {
  params: Promise<{ profileId: string }>;
};

async function ProfileIdPage({ params }: ProfileIdPageProps) {
  const { profileId } = await params;
  console.log("ProfileId", profileId);
  return <div>ProfileId: {profileId}</div>;
}

export default ProfileIdPage;
