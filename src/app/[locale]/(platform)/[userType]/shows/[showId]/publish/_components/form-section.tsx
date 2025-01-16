"use client";

import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import StepContent from "./step-content";

// Define the type for the podcastResponse. Replace 'any' with the correct type if available.
type PodcastResponseType = any;

type FormSectionProps = {
  step: number;
  addToPlayList: boolean;
  setAddToPlayList: React.Dispatch<React.SetStateAction<boolean>>;
  podcastResponse: PodcastResponseType;
  // selectedPlatforms: string[];
  // setSelectedPlatforms: React.Dispatch<React.SetStateAction<string[]>>;
  setUploadedNewPodcast: React.Dispatch<React.SetStateAction<boolean>>;
  podcast_id: string | null;
  t: (key: string) => string;
  dir: string;
};

/**
 * FormSection component that renders the content for each step in the form.
 *
 * @param {FormSectionProps} props - The properties passed to the component.
 * @returns {JSX.Element} The form section component.
 *
 * @example
 * ```tsx
 * <FormSection
 *   step={1}
 *   addToPlayList={false}
 *   setAddToPlayList={setAddToPlayList}
 *   podcastResponse={podcastResponse}
 *   selectedPlatforms={["web"]}
 *   setSelectedPlatforms={setSelectedPlatforms}
 *   setUploadedNewPodcast={setUploadedNewPodcast}
 *   podcast_id="123"
 *   t={(key) => key}
 *   dir="ltr"
 * />
 * ```
 */
const FormSection: React.FC<FormSectionProps> = ({
  step,
  addToPlayList,
  setAddToPlayList,
  podcastResponse,
  // selectedPlatforms,
  // setSelectedPlatforms,
  setUploadedNewPodcast,
  podcast_id,
  t,
  dir,
}) => {
  return (
    <Card className="bg-card/0 dark:bg-card-secondary border-none border-card-foreground/10 w-full h-[calc(100vh-184px)] min-h-[50dvh] px-2 lg:px-7 py-10 pb-2">
      <ScrollArea className="h-full">
        <CardContent className="flex flex-col gap-7">
          <StepContent
            step={step}
            addToPlayList={addToPlayList}
            setAddToPlayList={setAddToPlayList}
            podcastResponse={podcastResponse}
            // selectedPlatforms={selectedPlatforms}
            // setSelectedPlatforms={setSelectedPlatforms}
            setUploadedNewPodcast={setUploadedNewPodcast}
            podcast_id={podcast_id}
            t={t}
            dir={dir}
          />
        </CardContent>
      </ScrollArea>
    </Card>
  );
};

export default FormSection;
