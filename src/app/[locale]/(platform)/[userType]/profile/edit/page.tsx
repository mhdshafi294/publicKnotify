import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import EditUserProfile from "./_components/edit-user-profile";
import EditPodcasterProfile from "./_components/edit-podcaster-profile";
import EditCompanyProfile from "./_components/edit-company-profile";

const EditProfilepage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const content = () => {
    if (session.user.type === "user")
      return <EditUserProfile user={session.user} />;
    if (session.user.type === "podcaster") return <EditPodcasterProfile />;
    if (session.user.type === "company")
      return <EditCompanyProfile user={session.user} />;
  };

  return (
    <div className="md:max-w-screen-sm px-4 flex flex-col w-full items-center">
      {content()}
    </div>
  );
};

export default EditProfilepage;
