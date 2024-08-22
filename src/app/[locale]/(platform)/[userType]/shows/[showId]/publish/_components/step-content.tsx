"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { FormLabel } from "@/components/ui/form";
import { useTranslations } from "next-intl";

import FileUploader from "@/components/ui/file-uploader";
import DistriputionChannelButtonCard from "./distripution-channel-button-card";
import BasicInfoSection from "./basic-info-section";
import AdditionalInfoSection from "./additional-info-section";
import MediaUploadSection from "./media-upload-section";
import CategoryHashtagsSection from "./category-hashtags-section";
import WebIcon from "@/components/icons/web-icon";
import YoutubeIcon from "@/components/icons/youtube-icon";

import { API_URL, PODCASTS, UPLOAD_MEDIA_FILE } from "@/lib/apiEndPoints";
import ColorPicker from "@/components/ui/color-picker";

// Define the type for the podcastResponse. Replace 'any' with the correct type if available.
type PodcastResponseType = any;

type StepContentProps = {
  step: number;
  addToPlayList: boolean;
  setAddToPlayList: React.Dispatch<React.SetStateAction<boolean>>;
  podcastResponse: PodcastResponseType;
  selectedPlatforms: string[];
  setSelectedPlatforms: React.Dispatch<React.SetStateAction<string[]>>;
  setUploadedNewPodcast: React.Dispatch<React.SetStateAction<boolean>>;
  podcast_id: string | null;
  t: (key: string) => string;
  dir: string;
};

/**
 * StepContent component that renders the content for each step in the form.
 *
 * @param {StepContentProps} props - The properties passed to the component.
 * @returns {JSX.Element} The step content component.
 *
 * @example
 * ```tsx
 * <StepContent
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
const StepContent: React.FC<StepContentProps> = ({
  step,
  addToPlayList,
  setAddToPlayList,
  podcastResponse,
  selectedPlatforms,
  setSelectedPlatforms,
  setUploadedNewPodcast,
  podcast_id,
  t,
  dir,
}) => {
  const { watch, control } = useFormContext();

  // Render content based on the current step
  if (step === 1) {
    return (
      <>
        <BasicInfoSection t={t} />
        <AdditionalInfoSection
          addToPlayList={addToPlayList}
          setAddToPlayList={setAddToPlayList}
          t={t}
        />
        <CategoryHashtagsSection t={t} />
        <MediaUploadSection podcastResponse={podcastResponse} t={t} />
        <ColorPicker
          control={control}
          className="w-44"
          name="recast_color_border"
          label={t("recastBorderColor")}
        />
      </>
    );
  } else if (step === 2) {
    return (
      <div
        className="w-full flex flex-col gap-2 h-full justify-center"
        dir={dir}
      >
        <FormLabel className={"capitalize text-lg"} dir={dir}>
          {t("yourPodcastLabel")}
        </FormLabel>
        <FileUploader
          key={watch("type")}
          uploadId={podcast_id}
          type={watch("type")}
          endpoint={`${API_URL}podcaster${PODCASTS}${UPLOAD_MEDIA_FILE}`}
          initValue={
            podcastResponse?.podcast?.podcast
              ? podcastResponse?.podcast?.podcast
              : undefined
          }
          onUploadSuccess={() => console.log("Upload success")}
          onUploadError={(error) => console.log("Upload error", error)}
          setUploadedNewPodcast={setUploadedNewPodcast}
        />
        <p className="text-xs mt-1 opacity-80">{t("supportedFiles")}</p>
        <div className="w-full flex flex-col gap-3 lg:gap-5 mt-5 lg:mt-10">
          <h3 className="capitalize text-lg">
            {t("mainDistributionChannels")}
          </h3>
          <div className="w-full flex gap-5">
            <DistriputionChannelButtonCard
              platfotmName="web"
              PlatfotmIcon={WebIcon}
              selectedPlatforms={selectedPlatforms}
              setSelectedPlatforms={setSelectedPlatforms}
            />
            <DistriputionChannelButtonCard
              platfotmName="youtube"
              PlatfotmIcon={YoutubeIcon}
              selectedPlatforms={selectedPlatforms}
              setSelectedPlatforms={setSelectedPlatforms}
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default StepContent;
