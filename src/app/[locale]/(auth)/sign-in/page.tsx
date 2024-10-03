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
    <div className="md:max-w-[752px] min-h-screen flex flex-col items-center pt-[7dvh] pb-[2dvh]">
      {/* Container for the sign-in tabs */}
      <Tabs
        defaultValue={
          searchParams.userType ? (searchParams.userType as string) : "user"
        }
        className="md:w-[550px] flex flex-col items-center px-3 md:px-0"
      >
        {/* Tabs List: container for the tab triggers */}
        <TabsList className="w-full h-14 grid grid-cols-3 bg-transparent dark:text-white rounded-md mb-6 px-0 border-none border-transparent">
          {/* Tab Trigger for 'podcaster' */}
          <TabsTrigger
            value="podcaster"
            className="font-normal md:px-0 md:place-self-center"
          >
            {t("podcaster")}
          </TabsTrigger>
          {/* Tab Trigger for 'user' */}
          <TabsTrigger
            value="user"
            className="font-normal md:px-0 md:place-self-start"
          >
            {t("user")}
          </TabsTrigger>
          {/* Tab Trigger for 'company' */}
          <TabsTrigger
            value="company"
            className="font-normal md:px-0 md:place-self-end"
          >
            {t("company")}
          </TabsTrigger>
        </TabsList>

        {/* Tab Content for 'podcaster' */}
        <TabsContent value="podcaster">
          <SignInForm type="podcaster" />
        </TabsContent>
        {/* Tab Content for 'user' */}
        <TabsContent value="user">
          <SignInForm type="user" />
        </TabsContent>
        {/* Tab Content for 'company' */}
        <TabsContent value="company">
          <SignInForm type="company" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SignIp;
