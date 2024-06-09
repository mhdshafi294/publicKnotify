import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import MaxWidthContainer from "@/components/ui/MaxWidthContainer";
import { redirect } from "@/navigation";
import { getServerSession } from "next-auth";
import { Suspense } from "react";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect(`/${session?.user?.type}`);
  }

  return (
    <MaxWidthContainer className="mt-20 flex flex-col justify-center items-center">
      <h2 className="text-5xl">Hello There!</h2>
    </MaxWidthContainer>
  );
}
