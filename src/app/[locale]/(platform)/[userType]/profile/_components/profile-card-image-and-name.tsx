import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

const ProfileCardImageAndName = ({
  name,
  image,
}: {
  name: string;
  image: string;
}) => {
  return (
    <>
      <Avatar className="cursor-pointer size-28 border-4">
        <AvatarImage
          src={image!}
          alt={`${name} profile picture`}
          className="object-cover "
        />
        <AvatarFallback className="uppercase text-black text-3xl">
          {name?.slice(0, 2) as string}
        </AvatarFallback>
      </Avatar>
      <h1 className="text-2xl font-semibold text-center">{name}</h1>
    </>
  );
};

export default ProfileCardImageAndName;
