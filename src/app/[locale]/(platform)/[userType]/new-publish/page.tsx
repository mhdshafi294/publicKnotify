import { useTranslations } from "next-intl";

export default function NewPublish() {
  const t = useTranslations("Index");

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <p>New Publish</p>
      </main>
    </>
  );
}
