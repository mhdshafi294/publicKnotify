import { useState } from "react";

interface ImageOnLoadType {
  handleImageOnLoad: () => void;
  isLoaded: boolean;
}

/**
 * Custom hook for handling image loading events and providing related CSS styles.
 * @returns {ImageOnLoadType} An object containing a function to handle image load events and related CSS styles.
 * @example
 * const { handleImageOnLoad, isLoaded } = useImageOnLoad();
 * // Use handleImageOnLoad as the onLoad handler for the full-size image.
 * // Apply the CSS styles from the `css` object to control visibility and transitions.
 */
export function useImageOnLoad(): ImageOnLoadType {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Triggered when full image will be loaded.
  const handleImageOnLoad = () => {
    setIsLoaded(true);
  };

  return { handleImageOnLoad, isLoaded };
}
