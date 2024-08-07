"use client";

import { useEffect, useRef, useState } from "react";
import { SearchIcon } from "lucide-react";
import { useDebounce } from "use-debounce";
import { Input } from "./ui/input";
import { useRouter } from "@/navigation";
import { useSearchParams } from "next/navigation";
import { revalidatePath } from "next/cache";
import { useTranslations } from "next-intl";

const Search = ({
  searchText,
  searchFor,
}: {
  searchText?: string;
  searchFor: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRender = useRef(true);
  const t = useTranslations("Index");

  const [text, setText] = useState(searchText);
  const [query] = useDebounce(text, 750);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }

    router.push(`${searchFor}?${params.toString()}`);
  }, [query]);

  return (
    <div className="relative rounded-md shadow-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <SearchIcon size={20} />
      </div>
      <Input
        value={text}
        placeholder={`${t("search")} ${searchFor}...`}
        onChange={(e) => setText(e.target.value)}
        className="py-1.5 pl-10 placeholder:text-white/50"
      />
    </div>
  );
};

export default Search;
