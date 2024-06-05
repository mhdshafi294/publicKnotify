import { Volume2 } from "lucide-react";
import Image from "next/image";

const Player = () => {
  return (
    <footer className="fixed bottom-0 p-2 gap-4 left-0 flex justify-between items-center h-20 bg-secondary w-full">
      <div className="flex justify-start items-center h-full gap-2">
        <div className="h-full">
          <Image
            className="object-contain h-full bg-indigo-500 rounded"
            width={64}
            height={64}
            src="/logo.svg"
            alt="test"
          />
        </div>
        <div>
          <h2 className="text-foreground text-lg capitalize font-bold">
            podcast name
          </h2>
          <p className="text-foreground/20 capitalize text-sm">
            podcaster name
          </p>
        </div>
      </div>
      <div className="h-full w-2/5 max-w-screen-md flex flex-col justify-center items-center">
        <div>fff</div>
        <div className="w-full flex gap-3 justify-center items-center">
          <span className="text-xs">00:00:00</span>
          <div className="w-full h-1 bg-red-500"></div>
          <span className="text-xs">00:00:00</span>
        </div>
      </div>
      <div className="flex gap-2">
        <Volume2 />
      </div>
    </footer>
  );
};

export default Player;
