// External dependencies
import Image from "next/image"; // Next.js image component import

/**
 * EditProfileLayout Component
 *
 * This layout component wraps around profile editing pages, providing a visually appealing background and centering the content.
 * It includes background decorations and applies a blur effect to enhance the design.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The child components to be rendered within this layout.
 * @returns {JSX.Element} The rendered layout with background effects and centered content.
 */
const EditProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full min-h-[calc(100vh-72px)] w-full flex items-center justify-center">
      {/* Background decorations */}
      <div className="absolute overflow-hidden inset-0 h-full min-h-screen w-screen -z-10">
        {/* Background overlay */}
        <div className="absolute inset-0 h-full min-h-screen w-screen overflow-hidden -z-20" />

        {/* Decorative shapes */}
        <div className="absolute size-[580px] left-0 top-0 -z-10 -translate-x-1/2">
          <div className="absolute size-full left-0 top-0 -z-30 rounded-full bg-primary/50 blur-xl" />
          <div className="absolute size-14 top-10 right-20 -z-20 rounded-full bg-slate-500 blur-[20px]" />
        </div>

        {/* Background image */}
        <div className="absolute top-0 right-0 size-[340px] -z-20 blur-lg">
          <Image
            className="opacity-70 dark:opacity-50"
            src="/auth-r-bg.svg"
            alt="logo"
            fill
          />
        </div>
      </div>

      {/* Main content */}
      {children}
    </div>
  );
};

export default EditProfileLayout;
