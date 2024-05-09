import { LanguageSwitcher } from "@/components/language-switcher";
import SignInForm from "@/app/[locale]/(auth)/sign-in/_components/sign-in-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SignIp = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <div className="md:max-w-[752px] min-h-screen flex flex-col justify-center items-center">
      {/* <LanguageSwitcher /> */}
      <Tabs
        defaultValue={
          searchParams.userType
            ? (searchParams.userType as string)
            : "podcaster"
        }
        className="w-full py-8 flex flex-col items-center"
      >
        <TabsList className="w-[752px] h-fit grid grid-cols-3 bg-transparent text-white rounded-md border-white/50 border mb-12">
          <TabsTrigger value="user" className="font-normal text-xl">
            User
          </TabsTrigger>
          <TabsTrigger value="podcaster" className="font-normal text-xl">
            Podcaster
          </TabsTrigger>
          <TabsTrigger value="company" className="font-normal text-xl">
            Company
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
