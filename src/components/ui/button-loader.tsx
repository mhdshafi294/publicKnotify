// import useDirection from "@/hooks/use-direction";
import { useTranslations } from "next-intl";

import Loader from "./loader";

const ButtonLoader = () => {
  const t = useTranslations("Index");
  // const dir = useDirection();
  return (
    <span className="flex justify-center items-center gap-2">
      <span className="text-sm">{t("loading")}</span>
      <Loader />
    </span>
  );
};

export default ButtonLoader;
