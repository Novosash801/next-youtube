import NotFoundImage from "./not-found.gif";
import Image from "next/image";

const NotFoundPage = () => {
  return <Image src={NotFoundImage} width={500} alt={"not-found"} />;
};

export default NotFoundPage;
