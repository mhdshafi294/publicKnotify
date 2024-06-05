"use client";
import React from "react";
import { getServerSession } from "next-auth";

import { Heart } from "lucide-react";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getMyFavoriteCategoriesList from "@/services/podcast/get-my-favorite-categoris-list";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { ScrollArea } from "./ui/scroll-area";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getMyFavoriteCategoriesListAction } from "@/app/actions/podcastActions";

type FavoritePopoverProps = {
  isFavorite: boolean;
  triggerSize?: number;
};

const FavoritePopover: React.FC<FavoritePopoverProps> = ({
  isFavorite: is_favorite,
  triggerSize = 20,
}) => {
  const session = useSession();

  const {
    data: categories,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["favorite_categories", session.data?.user?.id],
    queryFn: () =>
      getMyFavoriteCategoriesListAction({
        type: session?.data?.user?.type!,
      }),
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        {is_favorite ? (
          <Heart
            size={triggerSize}
            fill="#004FFF"
            stroke="#004FFF"
            className="cursor-pointer hover:stroke-primary duration-300"
          />
        ) : (
          <Heart
            size={triggerSize}
            className="cursor-pointer hover:stroke-primary duration-300"
          />
        )}
      </PopoverTrigger>
      <PopoverContent>
        <p>Add to your Favorite lists</p>
        <Separator />
        <ScrollArea className="min-h-36 max-h-80">
          <ToggleGroup type="single">
            {isPending ? (
              <div>Loading...</div>
            ) : isError ? (
              <div>Error</div>
            ) : (
              categories.map((category) => (
                <ToggleGroupItem key={category.id} value={category.name}>
                  {category.name}
                </ToggleGroupItem>
              ))
            )}
          </ToggleGroup>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default FavoritePopover;

// const FavoritePopover: React.FC<FavoritePopoverProps> = async ({
//   is_favorite,
//   triggerSize = 20,
// }) => {
//   const session = await getServerSession(authOptions);

//   const categories = await getMyFavoriteCategoriesList({
//     type: session?.user?.type!,
//   });

//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         {is_favorite ? (
//           <Heart
//             size={triggerSize}
//             fill="#004FFF"
//             stroke="#004FFF"
//             className="cursor-pointer hover:stroke-primary duration-300"
//           />
//         ) : (
//           <Heart
//             size={triggerSize}
//             className="cursor-pointer hover:stroke-primary duration-300"
//           />
//         )}
//       </PopoverTrigger>
//       <PopoverContent>
//         <p>Add to your Favorite lists</p>
//         <Separator />
//         <ScrollArea className="min-h-36 max-h-80">
//           <ToggleGroup type="single">
//             {categories.map((category) => (
//               <ToggleGroupItem key={category.id} value={category.name}>
//                 {category.name}
//               </ToggleGroupItem>
//             ))}
//           </ToggleGroup>
//         </ScrollArea>
//       </PopoverContent>
//     </Popover>
//   );
// };

// export default FavoritePopover;
