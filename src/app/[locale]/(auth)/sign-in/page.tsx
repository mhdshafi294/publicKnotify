import SignInForm from "@/app/[locale]/(auth)/sign-in/_components/sign-in-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";

/**
 * SignIp component that displays a sign-in form with tabs for different user types.
 *
 * @param {object} props - The properties passed to the component.
 * @param {object} props.searchParams - The search parameters from the URL.
 * @returns {JSX.Element} The sign-in page component.
 *
 * @example
 * ```tsx
 * <SignIp searchParams={{ userType: 'podcaster' }} />
 * ```
 */
const SignIp = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const t = useTranslations("Index");

  return (
    <div className="md:max-w-[752px] w-full min-h-screen flex flex-col items-center pt-[7dvh] pb-[2dvh]">
      {/* Container for the sign-in tabs */}
      <Tabs
        defaultValue={
          searchParams.userType ? (searchParams.userType as string) : "user"
        }
        className="md:w-[550px] w-full flex flex-col items-center px-3 md:px-14 py-16 rounded-[40px] bg-black/15 shadow-lg backdrop-blur-lg text-white"
      >
        <h2 className="text-[32px] font-black mb-7">{t("signIn")}</h2>
        {/* Tabs List: container for the tab triggers */}
        <TabsList className="w-full h-14 flex justify-between bg-transparent text-white rounded-md mb-6 px-0 border-none border-transparent">
          {/* Tab Trigger for 'podcaster' */}
          <TabsTrigger
            value="podcaster"
            className="font-normal md:px-0 data-[state=active]:sm:text-greeny data-[state=active]:sm:!bg-transparent data-[state=active]:!text-xl data-[state=active]:!font-normal transition-all relative data-[state=active]:before:absolute data-[state=active]:before:bottom-0 data-[state=active]:sm:before:h-0.5 data-[state=active]:sm:before:end-0 sm:before:end-[100%] sm:before:start-0 sm:before:!z-50 sm:before:transition-all sm:before:duration-300 data-[state=active]:sm:before:bg-greeny"
          >
            {t("podcaster")}
          </TabsTrigger>
          {/* Tab Trigger for 'user' */}
          <TabsTrigger
            value="user"
            className="font-normal md:px-0 data-[state=active]:sm:text-greeny data-[state=active]:sm:!bg-transparent data-[state=active]:!text-xl data-[state=active]:!font-normal transition-all relative data-[state=active]:before:absolute data-[state=active]:before:bottom-0 data-[state=active]:sm:before:h-0.5 data-[state=active]:sm:before:end-0 sm:before:end-[100%] sm:before:start-0 sm:before:!z-50 sm:before:transition-all sm:before:duration-300 data-[state=active]:sm:before:bg-greeny"
          >
            {t("user")}
          </TabsTrigger>
          {/* Tab Trigger for 'company' */}
          <TabsTrigger
            value="company"
            className="font-normal md:px-0 data-[state=active]:sm:text-greeny data-[state=active]:sm:!bg-transparent data-[state=active]:!text-xl data-[state=active]:!font-normal transition-all relative data-[state=active]:before:absolute data-[state=active]:before:bottom-0 data-[state=active]:sm:before:h-0.5 data-[state=active]:sm:before:end-0 sm:before:end-[100%] sm:before:start-0 sm:before:!z-50 sm:before:transition-all sm:before:duration-300 data-[state=active]:sm:before:bg-greeny"
          >
            {t("company")}
          </TabsTrigger>
        </TabsList>

        {/* Tab Content for 'podcaster' */}
        <TabsContent value="podcaster" className="w-full">
          <SignInForm type="podcaster" />
        </TabsContent>
        {/* Tab Content for 'user' */}
        <TabsContent value="user" className="w-full">
          <SignInForm type="user" />
        </TabsContent>
        {/* Tab Content for 'company' */}
        <TabsContent value="company" className="w-full">
          <SignInForm type="company" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SignIp;
