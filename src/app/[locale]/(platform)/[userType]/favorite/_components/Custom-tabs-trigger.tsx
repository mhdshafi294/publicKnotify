"use client";

import React from "react"; // Core React import for creating components
import { useRouter } from "next/navigation"; // External dependency for routing

import { TabsTrigger } from "@/components/ui/tabs"; // Internal dependency for tab trigger component

/**
 * Function to update URL search parameters
 *
 * This function updates the current URL's search parameters and pushes the new URL to the browser's history.
 *
 * @param {string} param - The parameter to update in the URL.
 * @param {string} value - The new value for the parameter.
 */
const updateSearchParams = (param: string, value: string) => {
  const url = new URL(window.location.href);
  url.searchParams.set(param, value);
  window.history.pushState({}, "", url.toString());
};

// Props interface for CustomTabsTrigger component
interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * CustomTabsTrigger Component
 *
 * This component renders a tab trigger that updates the URL search parameters when clicked.
 * It utilizes the TabsTrigger component from the internal UI library and modifies its behavior to
 * update the URL with the selected tab value.
 *
 * @param {string} value - The value associated with this tab trigger.
 * @param {React.ReactNode} children - The content to be rendered inside the tab trigger.
 * @param {string} [className] - Optional additional class names for styling.
 * @returns {JSX.Element} The rendered tab trigger component.
 */
const CustomTabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  children,
  ...props
}) => {
  const router = useRouter();

  // Handler to update URL search parameters on click
  const handleClick = () => {
    updateSearchParams("tab", value);
  };

  return (
    <TabsTrigger value={value} onClick={handleClick} {...props}>
      {children}
    </TabsTrigger>
  );
};

export default CustomTabsTrigger;
