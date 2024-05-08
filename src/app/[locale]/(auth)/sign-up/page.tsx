import { LanguageSwitcher } from "@/components/language-switcher";
import SignUpForm from "@/app/[locale]/(auth)/sign-up/_components/sign-up-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SignUp = () => {
  return (
    <div className="md:max-w-[752px] min-h-screen flex flex-col justify-center items-center">
      {/* <LanguageSwitcher /> */}
      <Tabs defaultValue="podcaster" className="w-full py-8">
        <TabsList className="w-full h-fit grid grid-cols-3 bg-transparent text-white rounded-md border-white/50 border mb-12">
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
