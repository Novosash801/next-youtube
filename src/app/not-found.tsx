import { Metadata } from "next";

import NotFoundPage from "../screen/NotFoundScreen";

export const metadata: Metadata = {
  title: "Страница не найдена",
};

const NotFound = () => {
  return (
    <div>
      <NotFoundPage />
    </div>
  );
};

export default NotFound;
