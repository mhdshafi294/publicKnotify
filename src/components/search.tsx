"use client";

// Global imports
import { useEffect, useRef, useState } from "react";
import { SearchIcon } from "lucide-react";
import { useDebounce } from "use-debounce";
import { useRouter } from "@/navigation";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

// Local imports
import { Input } from "./ui/input";

/**
 * Search Component
 * Handles the search functionality by updating the URL with a query parameter.
 * Debounces the input to limit the frequency of URL updates.
 *
 * @param {Object} props - The props object.
 * @param {string} [props.searchText] - Optional initial search text.
 * @param {string} props.searchFor - The type of search (e.g., "products", "users").
 *
 * @returns {JSX.Element} The search input field with a search icon.
 */
const Search: React.FC<{ searchText?: string; searchFor: string }> = ({
  searchText,
  searchFor,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Ref to handle initial render
  const initialRender = useRef(true);

  const t = useTranslations("Index");

  const [text, setText] = useState(searchText);

  // Debounced query to reduce API calls or updates
  const [query] = useDebounce(text, 750);

  // Effect to handle changes in the debounced query
  useEffect(() => {
    // Skip effect on initial render
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    // Create URLSearchParams instance to modify query parameters
    const params = new URLSearchParams(searchParams.toString());

    // Set or delete search parameter based on query value
    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }

    // Update URL with new query parameters
    router.push(`${searchFor}?${params.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]); // Dependencies omitted as per preference

  return (
    <div className="relative rounded-md shadow-sm">
      {/* Icon container */}
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <SearchIcon size={20} />
      </div>
      {/* Input field for search */}
      <Input
        value={text}
        placeholder={`${t("search")} ${searchFor}...`}
        onChange={(e) => setText(e.target.value)}
        className="py-1.5 pl-10 placeholder:text-foreground/50 dark:placeholder:text-white/50"
      />
    </div>
  );
};

export default Search;
