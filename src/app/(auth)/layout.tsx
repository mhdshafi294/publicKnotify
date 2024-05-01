import Image from "next/image";

const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full min-h-screen w-full flex items-center justify-center">
      <div className="absolute inset-0 h-screen w-screen overflow-hidden -z-10">
        <div className="absolute inset-0 h-screen w-screen overflow-hidden -z-20" />
        <div className="absolute size-[580px] left-0 top-0 -z-10 -translate-x-1/2">
          <div className="absolute size-full left-0 top-0 -z-30 rounded-full bg-primary/50 blur-xl" />
          <div className="absolute size-14 top-10 right-20 -z-20 rounded-full bg-slate-500 blur-[20px]" />
        </div>
        <div className="absolute top-0 right-0 size-[340px] -z-20 blur-lg">
          <Image className="opacity-50" src="/auth-r-bg.svg" alt="logo" fill />
        </div>
      </div>
      {children}
    </div>
  );
};

export default ClerkLayout;
