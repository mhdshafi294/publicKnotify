import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/**
 * Component to display a profile's image and name.
 *
 * @param {object} props - Component props.
 * @param {string} props.name - The name of the profile.
 * @param {string} props.image - The URL of the profile image.
 * @returns {JSX.Element} The rendered profile image and name.
 */
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
        {/* Display profile image or fallback */}
        <AvatarImage
          src={image!}
          alt={`${name} profile picture`}
          className="object-cover"
        />
        <AvatarFallback className="uppercase text-black text-3xl">
          {/* Display initials if image is not available */}
          {name?.slice(0, 2) as string}
        </AvatarFallback>
      </Avatar>
      {/* Display profile name */}
      <h1 className="text-2xl font-semibold text-center">{name}</h1>
    </>
  );
};

export default ProfileCardImageAndName;
