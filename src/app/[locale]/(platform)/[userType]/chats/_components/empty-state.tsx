import { useTranslations } from "next-intl";

const EmptyState = () => {
  const t = useTranslations("Index");

  return (
    <div
      className="
        px-4 
        py-10 
        sm:px-6 
        lg:px-8 
        lg:py-6 
        h-full 
        flex 
        justify-center 
        items-center 
      "
    >
      <div className="text-center items-center flex flex-col">
        <h3 className="mt-2 text-2xl font-semibold italic">
          {t("select-a-chat")}
        </h3>
      </div>
    </div>
  );
};

export default EmptyState;
