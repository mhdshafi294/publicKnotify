import React from "react";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import CustomTabsTrigger from "./CustomTabsTrigger";

const PodcastsAndPodcastersFavoritesTabs = ({
  params,
  searchParams,
}: {
  params: { userType: string };
  searchParams: { [key: string]: string | string[] | undefined } | undefined;
}) => {
  const tab = searchParams?.tab ? (searchParams.tab as string) : "podcasts";

  return (
    <Tabs defaultValue={tab} className="w-[400px]">
      <TabsList className="w-full h-14 grid grid-cols-2 bg-transparent text-white rounded-md mb-6 px-0 border-none border-transparent data-[state=active]:md:bg-greeny data-[state=active]:md:text-black data-[state=active]:font-bold">
        <CustomTabsTrigger
          className="data-[state=active]:md:text-xl data-[state=active]:md:text-greeny data-[state=active]:font-bold data-[state=active]:before:absolute data-[state=active]:before:h-0.5 data-[state=active]:before:w-7 data-[state=active]:before:bg-greeny data-[state=active]:before:translate-y-4 data-[state=active]:before:rounded-full hover:no-underline hover:before:absolute hover:before:h-0.5 hover:before:w-7 hover:before:bg-primary hover:before:translate-y-4 hover:before:rounded-full"
          value="podcasts"
        >
          Podcasts
        </CustomTabsTrigger>
        <CustomTabsTrigger
          className="data-[state=active]:md:text-xl data-[state=active]:md:text-greeny data-[state=active]:font-bold data-[state=active]:before:absolute data-[state=active]:before:h-0.5 data-[state=active]:before:w-7 data-[state=active]:before:bg-greeny data-[state=active]:before:translate-y-4 data-[state=active]:before:rounded-full hover:no-underline hover:before:absolute hover:before:h-0.5 hover:before:w-7 hover:before:bg-primary hover:before:translate-y-4 hover:before:rounded-full"
          value="podcasters"
        >
          Podcasters
        </CustomTabsTrigger>
      </TabsList>
      <TabsContent value="podcasts">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="podcasters">Change your password here.</TabsContent>
    </Tabs>
  );
};

export default PodcastsAndPodcastersFavoritesTabs;
