import { useTranslations } from "next-intl";
import SignUpForm from "@/app/[locale]/(auth)/sign-up/_components/sign-up-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/**
 * SignUp component that displays a sign-up form with tabs for different user types.
 *
 * @returns {JSX.Element} The sign-up page component.
 *
 * @example
 * ```tsx
 * <SignUp />
 * ```
 */
const SignUp = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const t = useTranslations("Index");

  return (
    <div className="md:max-w-[752px] min-h-screen flex flex-col items-center pt-[3dvh] lg:pt-[7dvh] pb-[2dvh]">
      {/* Container for the sign-up tabs */}
      <Tabs
        defaultValue={
          searchParams.userType
            ? (searchParams.userType as string)
            : "podcaster"
        }
        className="md:w-[550px] flex flex-col items-center px-3 md:px-0"
      >
        {/* Tabs List: container for the tab triggers */}
        <TabsList className="w-full h-14 grid grid-cols-3 bg-transparent text-white rounded-md mb-6 px-0 border-none border-transparent">
          {/* Tab Trigger for 'user' */}
          <TabsTrigger
            value="user"
            className="font-normal md:px-0 md:place-self-start"
          >
            {t("user")}
          </TabsTrigger>
          {/* Tab Trigger for 'podcaster' */}
          <TabsTrigger
            value="podcaster"
            className="font-normal md:px-0 md:place-self-center"
          >
            {t("podcaster")}
          </TabsTrigger>
          {/* Tab Trigger for 'company' */}
          <TabsTrigger
            value="company"
            className="font-normal md:px-0 md:place-self-end"
          >
            {t("company")}
          </TabsTrigger>
        </TabsList>
        {/* Tab Content for 'user' */}
        <TabsContent value="user">
          <SignUpForm type="user" />
        </TabsContent>
        {/* Tab Content for 'podcaster' */}
        <TabsContent value="podcaster">
          <SignUpForm type="podcaster" />
        </TabsContent>
        {/* Tab Content for 'company' */}
        <TabsContent value="company">
          <SignUpForm type="company" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SignUp;
