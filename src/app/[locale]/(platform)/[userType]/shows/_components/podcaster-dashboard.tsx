import Image from "next/image";
import React from "react";

const PodcasterDashboard = () => {
  return (
    <div className="flex-1 h-full flex w-full">
      {/* Left Sidebar */}
      <div className="bg-[#1a1929] w-80 "></div>
      {/* Main Content */}
      <div className="bg-background w-full flex-1 py-16 px-8 xl:px-16">
        <div className="w-full grid grid-cols-3 gap-8">
          {/* Content card */}
          <div className="p-8 bg-[#1a1929] border border-card-foreground/10  h-[404px] rounded-[8px] shadow-[2px_2px_0px_0px_#302e3e] relative">
            <div className="w-full h-[150px] relative grayscale">
              <Image
                src="/podcast-filler.webp"
                alt="podcaster dashboard"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover rounded "
              />
              <h2>Publish an episode</h2>
              <p>
                In order to submit and publish your Show, you must first publish
                an episode
              </p>
              <div className="absolute bottom-0 left-0"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcasterDashboard;
