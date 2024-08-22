"use client";

import { useFormContext } from "react-hook-form";
import FormFileInput from "@/components/ui/form-input-file";

/**
 * MediaUploadSectionProps interface for the MediaUploadSection component.
 */
type MediaUploadSectionProps = {
  podcastResponse: any; // Replace with the correct type
  t: (key: string) => string;
};

/**
 * MediaUploadSection component for uploading media files (thumbnail and background).
 *
 * @param {MediaUploadSectionProps} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered MediaUploadSection component.
 *
 * @example
 * ```tsx
 * <MediaUploadSection podcastResponse={response} t={translateFunction} />
 * ```
 */
const MediaUploadSection: React.FC<MediaUploadSectionProps> = ({
  podcastResponse,
  t,
}) => {
  const { control } = useFormContext();
  const podcastType = useFormContext().watch("type");

  return (
    <div className="w-full flex justify-between gap-5">
      <FormFileInput
        name="thumbnail"
        label={t("thumbnailLabel")}
        control={control}
        className="w-full"
        initValue={
          podcastResponse?.podcast?.thumbnail
            ? podcastResponse?.podcast?.thumbnail
            : undefined
        }
      />
      <FormFileInput
        name="background"
        label={t("backgroundLabel")}
        disabled={podcastType === "video"}
        control={control}
        className="w-full"
        initValue={
          podcastResponse?.podcast?.background
            ? podcastResponse?.podcast?.background
            : undefined
        }
      />
    </div>
  );
};

export default MediaUploadSection;
