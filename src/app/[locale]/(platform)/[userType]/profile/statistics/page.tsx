import { buttonVariants } from "@/components/ui/button";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import axiosInstance from "@/lib/axios.config";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { ApiResponse } from "@/types";
import Image from "next/image";
import { cache } from "react";

const getPodcasts = cache(async (type: string) => {
  const { data } = await axiosInstance.get<
    ApiResponse & { podcasts: { id: number; name: string }[] }
  >(`/${type}/podcast/get-all`);
  return data.podcasts;
});

export const revalidate = 10 * 60;

const statisticsPage = async ({ params }: { params: { userType: string } }) => {
  const data = await getPodcasts(params.userType);
  return (
    <>
      <main className="flex lg:min-h-[calc(100vh-72px)] flex-col items-center justify-between py-12">
        <MaxWidthContainer className="w-full lg:min-h-[calc(100vh-168px)] flex flex-col gap-2 lg:flex-row lg:gap-10">
          <div className="w-full lg:w-3/12 rounded-lg lg:bg-card lg:py-14 px-4 lg:px-10 flex flex-col items-center lg:gap-12 gap-6">
            <div className="w-full flex justify-center items-center gap-3">
              <Image
                src="/statistics.png"
                alt="draft"
                width={800}
                height={124}
                className="size-full z-10 rounded-lg object-contain"
              />
            </div>
            <div className="flex flex-col items-start justify-start w-full gap-10">
              <div className="size-full flex flex-col justify-start items-start">
                <h2 className="text-2xl font-bold capitalize">podcasts Name</h2>
                {data.map((podcast) => (
                  <Link
                    href={{ search: `?podcasterId=${podcast.id}` }}
                    scroll={false}
                    key={podcast.id}
                    className={cn(
                      buttonVariants({ variant: "link" }),
                      "text-lg px-0 capitalize"
                    )}
                  >
                    {podcast.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full relative rounded-lg p-5 bg-secondary lg:w-8/12">
            <div className="w-full flex justify-end sticky px-4 rounded-xl top-20 min-h-10">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 [&_>_div]:p-8 [&_>_div]:rounded-md">
                <div className="bg-greeny flex justify-center flex-col items-center text-primary">
                  <h3 className="text-5xl font-bold">9 min</h3>
                  <p className="text-2xl">times all episodes</p>
                </div>
                <div className="bg-primary flex justify-center flex-col items-center">
                  <h3 className="text-5xl font-bold">8776</h3>
                  <p className="text-2xl">
                    Average number of listens per episode
                  </p>
                </div>
                <div className="bg-background/75 flex justify-start flex-col items-center !p-4">
                  <div className="w-full flex justify-start items-center gap-2">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21.3841 1.68141C21.6623 1.07203 22.181 0.900159 22.6123 0.881409C23.2685 0.850159 23.956 1.30328 24.6029 1.83766C25.0623 2.35641 25.6123 2.75641 26.2498 3.03766C26.6904 3.19391 27.1279 3.22516 27.5716 3.20328C28.1966 3.17203 28.831 3.03453 29.4591 3.00328L29.4935 3.00016L29.7779 2.97516C30.4966 2.94078 31.1748 3.10953 31.8185 3.48141C32.4091 4.01891 32.6685 4.68766 32.5873 5.49391C32.4498 6.15953 32.5685 6.76891 32.9404 7.32203C33.581 7.77203 34.2529 8.16578 34.9591 8.50016C35.6904 8.90016 36.1498 9.50328 36.3498 10.3064C36.4216 11.1564 36.0279 11.7002 35.1779 11.9345C34.0716 12.2127 32.5841 12.2127 31.331 13.1814C29.4998 14.7095 28.9248 16.2502 28.1279 16.4845C27.7373 16.0408 25.2998 14.1564 21.2123 13.2533C20.481 10.7314 20.0373 4.64391 21.3841 1.68141Z"
                        fill="#FCC21B"
                      />
                      <path
                        d="M25.5078 12.7156C26.2266 11.2781 28.2734 8.75 28.7641 9.25C29.2484 9.79375 28.1328 12.6188 27.3484 14.0031C27.0703 13.7094 26.1734 13.0938 25.7828 12.9906"
                        fill="#D19B15"
                      />
                      <path
                        d="M29.1252 17.3185C28.7033 17.3185 28.2908 17.1029 28.0564 16.7154C25.9064 13.1779 21.0377 13.5498 20.9908 13.556C20.3033 13.6123 19.697 13.106 19.6377 12.4217C19.6086 12.0925 19.7109 11.7651 19.9222 11.5111C20.1336 11.257 20.4368 11.0968 20.7658 11.0654C21.0283 11.0404 27.2252 10.531 30.1939 15.4217C30.5533 16.0123 30.3627 16.781 29.7752 17.1373C29.5689 17.2592 29.347 17.3185 29.1252 17.3185Z"
                        fill="#8D6E63"
                      />
                      <path
                        d="M30.0217 38.1469C24.6686 39.4657 17.228 39.3719 11.9124 38.3219C6.93736 37.3375 3.12799 34.4032 3.56549 28.6282C4.00924 22.7844 7.88111 17.2813 13.2061 14.8563C18.3592 12.5094 25.2749 11.3657 28.9186 16.6907C29.8249 18.0157 31.5561 20.9563 31.6374 22.4C31.6436 22.5157 31.6499 22.6188 31.6749 22.7188C31.6811 23.0813 31.828 23.4469 32.1842 23.7157C34.4749 25.45 36.1436 27.75 36.4499 30.9032C36.8124 34.6625 33.2561 37.35 30.0217 38.1469Z"
                        fill="#FCC21B"
                      />
                      <path
                        d="M25.2734 28.4782C24.6234 27.4219 23.4266 26.2751 22.2953 25.2907L23.1734 22.8594C23.9547 23.4688 24.6422 24.0407 25.1797 24.5344C25.2672 24.6188 25.4047 24.6251 25.5047 24.5532L27.5172 23.0563C27.5734 23.0126 27.6078 22.9501 27.6172 22.8782C27.6205 22.8431 27.6164 22.8077 27.6051 22.7743C27.5938 22.7409 27.5755 22.7103 27.5516 22.6844C26.9547 22.0188 25.6609 20.8532 24.2453 19.8938L24.7609 18.4688C24.8203 18.3063 24.7391 18.1282 24.5734 18.0657L22.2078 17.2094C22.0453 17.1501 21.8641 17.2344 21.8047 17.3969L21.4203 18.4626C19.1922 17.7719 17.4234 17.9938 16.0359 19.1532C14.9484 20.0657 14.4797 21.3688 14.8109 22.5501C15.1484 23.8094 16.1359 24.6719 17.3859 25.7626L17.5453 25.9032C17.8359 26.1532 18.1453 26.4126 18.4484 26.6719L17.3797 29.6282C15.9766 28.7094 14.8016 27.4376 14.6016 27.1594C14.5641 27.1078 14.5084 27.0723 14.4458 27.0601C14.3831 27.0479 14.3182 27.06 14.2641 27.0938L11.9453 28.5751C11.8891 28.6094 11.8484 28.6688 11.8328 28.7376C11.8203 28.8032 11.8328 28.8719 11.8703 28.9282C12.5672 29.9782 13.7078 31.1532 14.9234 32.0719C15.2141 32.2907 15.6516 32.5969 16.1891 32.9188L15.7859 34.0282C15.7297 34.1907 15.8109 34.3688 15.9734 34.4282L18.3422 35.2876C18.5047 35.3469 18.6859 35.2626 18.7453 35.1001L19.0797 34.1751C21.2422 34.7626 23.1422 34.4219 24.6109 33.1657C26.0297 31.9501 26.2734 30.2438 25.2734 28.4782ZM20.3703 21.3751L19.7234 23.1657C19.1203 22.6969 18.7984 22.3438 19.0266 21.8376C19.2641 21.3188 19.8547 21.2844 20.3703 21.3751ZM21.0109 28.8438C21.4266 29.2469 21.7203 29.6188 21.7484 29.9594C21.7609 30.1532 21.6891 30.3407 21.5203 30.5344C21.2266 30.8751 20.7578 30.9407 20.2734 30.8813L21.0109 28.8438Z"
                        fill="#424242"
                      />
                    </svg>
                    <h3 className="text-3xl font-bold">Revenue statistics</h3>
                  </div>
                </div>
                <div className="bg-background/75 flex justify-center flex-col items-center">
                  <h3 className="text-5xl font-bold">8776</h3>
                  <p className="text-2xl">
                    Average number of listens per episode
                  </p>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthContainer>
      </main>
    </>
  );
};

export default statisticsPage;
