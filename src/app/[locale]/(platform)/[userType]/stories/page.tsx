import { redirect } from "@/navigation";
import React from "react";

/**
 * Redirects to "/" and renders a placeholder <div> element
 * with the text "StoriesPage".
 *
 * @returns {JSX.Element} A JSX element containing a placeholder
 *   <div> element with the text "StoriesPage".
 */
const StoriesPage = () => {
  redirect("/");
  return <div>StoriesPage</div>;
};

export default StoriesPage;
