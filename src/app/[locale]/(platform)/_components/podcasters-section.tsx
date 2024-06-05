import { PodcasterCard } from "@/components/podcaster-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import getPodcasters from "@/services/podcaster/get-podcasters";

const PodcastersSection = async ({
  params,
  searchParams,
}: {
  params: { userType: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const data = await getPodcasters({
    count: "10",
    search: searchParams.search as string,
    page: "1",
    type: params.userType as string,
  });

  return (
    <div className="w-full space-y-5">
      <Carousel opts={{ slidesToScroll: "auto" }} className="">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl">Top 10 Podcasters</h2>
          <div className="flex relative justify-end items-center end-[80px]">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </div>
        <CarouselContent className="w-full mt-5">
          {data?.podcasters.length === 0 ? (
            <p>No podcasters to load</p>
          ) : (
            data?.podcasters.map((podcaster) => (
              <CarouselItem
                key={podcaster.id}
                className="basis-1/3 md:basis-1/5 lg:basis-1/6"
              >
                <PodcasterCard
                  full_name={podcaster.full_name}
                  image={podcaster.image}
                  is_favorite={podcaster.is_favorite}
                />
              </CarouselItem>
            ))
          )}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default PodcastersSection;
