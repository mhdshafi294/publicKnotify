// import useDirection from "@/hooks/use-direction";
// import { useTranslation } from "react-i18next";

import Loader from "./loader";

const ButtonLoader = ({ message = "global.loading-text" }) => {
  // const { t } = useTranslation();
  // const dir = useDirection();
  return (
    <span className="flex justify-center items-center gap-2">
      {/* <span className="text-sm">{t(message)}</span> */}
      <span className="text-sm">Loading...</span>
      <Loader />
    </span>
  );
};

export default ButtonLoader;
