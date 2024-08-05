import SignInForm from "@/app/[locale]/(auth)/sign-in/_components/sign-in-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";

const SignIp = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const t = useTranslations("Index");

  return (
    <div className="md:max-w-[752px] min-h-screen flex flex-col items-center pt-[7dvh] pb-[2dvh]">
      {/* <LanguageSwitcher /> */}
      <Tabs
        defaultValue={
          searchParams.userType
            ? (searchParams.userType as string)
            : "podcaster"
        }
        className="md:w-[550px] flex flex-col items-center px-3 md:px-0"
      >
        <TabsList className="w-full h-14 grid grid-cols-3 bg-transparent text-white rounded-md mb-6 px-0 border-none border-transparent">
          <TabsTrigger
            value="user"
            className="font-normal md:px-0 md:place-self-start"
          >
            {t("user")}
          </TabsTrigger>
          <TabsTrigger
            value="podcaster"
            className="font-normal md:px-0 md:place-self-center"
          >
            {t("podcaster")}
          </TabsTrigger>
          <TabsTrigger
            value="company"
            className="font-normal md:px-0 md:place-self-end"
          >
            {t("company")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="user">
          <SignInForm type="user" />
        </TabsContent>
        <TabsContent value="podcaster">
          <SignInForm type="podcaster" />
        </TabsContent>
        <TabsContent value="company">
          <SignInForm type="company" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SignIp;
