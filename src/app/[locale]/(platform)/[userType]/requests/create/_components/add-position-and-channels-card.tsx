"use client";

// Global imports
import React from "react";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";

// Local imports
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import PriceRadioGroupFormInput from "@/components/ui/price-radio-group-form-input";
import ToggleFormInput from "@/components/ui/toggle-form-input";
import YoutubeIconWhite from "@/components/icons/youtube-icon-white";
import SpotifyIcon from "@/components/icons/spotify-icon";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/button-loader";
import { PodcasterDetails } from "@/types/podcaster";

type AddPositionAndChannelsCardProps = {
  podcaster?: PodcasterDetails;
  isPending: boolean;
};

/**
 * AddPositionAndChannelsCard Component
 * Renders a card that allows users to select the position of an advertisement and the distribution channels for a podcaster.
 * Includes form inputs for selecting advertisement type and position, as well as toggles for distribution channels like YouTube and Spotify.
 *
 * @param {Object} props - The props object.
 * @param {PodcasterDetails} props.podcaster - The details of the podcaster, including price and distribution channels.
 * @param {boolean} props.isPending - Indicates if the form submission is in progress.
 *
 * @returns {JSX.Element} The card component with form inputs for ad position and distribution channels.
 */
const AddPositionAndChannelsCard: React.FC<AddPositionAndChannelsCardProps> = ({
  podcaster,
  isPending,
}) => {
  // Access form context and translations
  const form = useFormContext();
  const t = useTranslations("Index");

  return (
    <Card className="bg-card/50 border-card-foreground/10 w-full h-full px-3 lg:px-5 py-10 pb-2">
      <CardHeader className="py-0 px-0 text-xl">
        {t("whereToAddYourAD")}
      </CardHeader>
      <CardContent className="px-0 mt-5">
        {/* Form input for selecting ad position */}
        <PriceRadioGroupFormInput
          name="ad_place"
          label={t("adTypeAndPosition")}
          control={form.control}
          options={[t("first"), t("middle"), t("end"), t("video")]}
          price={podcaster?.price}
          className="bg-background h-full py-5 rounded-lg px-3"
          labelClassName="text-lg w-full h-full"
          groupClassName="flex-col items-start gap-3"
          groupItemClassName="bg-card/50 rounded-lg px-5 w-full"
          radioGroupItemClassName="size-6 border-none bg-greeny/10"
        />

        {/* Form inputs for selecting distribution channels */}
        <div className="space-y-2 mt-5">
          <p className="text-lg">{t("distributionChannels")}</p>
          <div className="w-full flex justify-start gap-2 items-center">
            <ToggleFormInput
              name="publish_youtube"
              control={form.control}
              className="size-10 px-1.5"
              icon={<YoutubeIconWhite className="size-8" />}
              disabled={!podcaster?.youtube_account}
            />
            <ToggleFormInput
              name="publish_spotify"
              control={form.control}
              className="size-10 px-1.5"
              icon={<SpotifyIcon size={32} />}
              disabled={!podcaster?.spotify_account}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="lg:hidden">
        <Button
          disabled={isPending}
          className="w-full capitalize mt-0 font-bold"
          type="submit"
        >
          {isPending ? <ButtonLoader /> : t("continue")}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddPositionAndChannelsCard;
