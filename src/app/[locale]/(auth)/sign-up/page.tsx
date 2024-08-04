import { useTranslations } from "next-intl";
import SignUpForm from "@/app/[locale]/(auth)/sign-up/_components/sign-up-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SignUp = () => {
  const t = useTranslations("Auth");

  return (
    <div className="md:max-w-[752px] min-h-screen flex flex-col items-center pt-[3dvh] lg:pt-[7dvh] pb-[2dvh]">
      <Tabs
        defaultValue="podcaster"
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
          <SignUpForm type="user" />
        </TabsContent>
        <TabsContent value="podcaster">
          <SignUpForm type="podcaster" />
        </TabsContent>
        <TabsContent value="company">
          <SignUpForm type="company" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SignUp;
