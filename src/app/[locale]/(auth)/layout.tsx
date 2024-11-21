import Image from "next/image";
import React from "react";

/**
 * AuthLayout component that provides a layout for authentication-related pages.
 *
 * @param {object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The authentication layout component.
 *
 * @example
 * ```tsx
 * <AuthLayout>
 *   <LoginForm />
 * </AuthLayout>
 * ```
 */
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full min-h-[calc(100vh-72px)] w-full flex items-center justify-center relative overflow-hidden bg-[#004FFF] ">
      {/* Background Elements */}
      {/* <div className="absolute overflow-hidden inset-0 h-full min-h-screen w-screen -z-10">
        <div className="absolute inset-0 h-full min-h-screen w-screen overflow-hidden -z-20" />
        <div className="absolute size-[580px] left-0 top-0 -z-10 -translate-x-1/2">
          <div className="absolute size-full left-0 top-0 -z-30 rounded-full bg-primary/50 blur-xl" />
          <div className="absolute size-14 top-10 right-20 -z-20 rounded-full bg-slate-500 blur-[20px]" />
        </div>
        <div className="absolute top-0 right-0 size-[340px] -z-20 blur-lg">
          <Image
            className="opacity-70 dark:opacity-50"
            src="/auth-r-bg.svg"
            alt="logo"
            fill
          />
        </div>
      </div> */}
      {/* <div className="absolute inset-0 h-full min-h-screen w-screen flex items-center justify-center"> */}
      <Image
        src="/Vector1.png"
        alt="background logo"
        width={1000}
        height={1400}
        className="absolute top-0 left-0 -translate-y-36 blur-3xl "
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <Image
        src="/Vector2.png"
        alt="background logo"
        width={1000}
        height={1400}
        className="absolute top-0 right-0 -translate-y-20 blur-3xl "
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <Image
        src="/Vector3.png"
        alt="background logo"
        width={1000}
        height={1400}
        className="absolute bottom-0 left-0 translate-y-36 translate-x-10 blur-3xl "
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      {/* </div> */}
      {/* <Image
        src="/auth-bg1.png"
        alt="background logo"
        width={5000}
        height={5000}
        className="absolute inset-0 h-full min-h-screen w-screen object-cover blur-3xl "
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      /> */}
      {/* Children Components */}
      {children}
    </div>
  );
};

export default AuthLayout;
