import Image from "next/image";

import NotFoundImage from "./not-found.gif";

const NotFoundPage = () => {
  return <Image src={NotFoundImage} width={500} alt={"not-found"} />;
};

export default NotFoundPage;
