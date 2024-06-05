import { Category } from "@/types/podcast";
import Link from "next/link";
import React, { FC } from "react";

type PropsType = {
    category: Category
}

const CategoryCard:FC<PropsType> = ({category}) => {
  return (
    <Link href="/" className="bg-secondary rounded-lg w-48 p-6" key={category.id}>
      <p className="text-xl font-bold capitalize">{category.name}</p>
    </Link>
  );
};

export default CategoryCard;
