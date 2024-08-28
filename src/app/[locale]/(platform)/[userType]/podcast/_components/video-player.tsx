"use client";

import { FC, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import usePlayerStore from "@/store/use-player-store"; // Local store for managing player state
import { savePlaybackAction } from "@/app/actions/podcastActions"; // API action for saving playback progress

interface VideoPlayerProps {
  podcastId: number;
  thumbnail: string;
  src: string;
}

/**
 * VideoPlayer Component
 *
 * This component renders a video player with controls. It manages the playback state
 * using a global store and saves playback progress to the server on specific events.
 *
 * @param {number} podcastId - The ID of the podcast being played.
 * @param {string} thumbnail - The URL of the podcast thumbnail.
 * @param {string} src - The URL of the podcast media.
 */
const VideoPlayer: FC<VideoPlayerProps> = ({ podcastId, thumbnail, src }) => {
  const { data: session } = useSession(); // Access session data using NextAuth
  const videoRef = useRef<HTMLVideoElement>(null); // Create a ref for the video element

  // Access and manage player state using the custom store
  const setPodcastId = usePlayerStore((state) => state.setPodcastId);
  const setIsRunning = usePlayerStore((state) => state.setIsRunning);
  const duration = usePlayerStore((state) => state.duration);
  const currentTime = usePlayerStore((state) => state.currentTime);
  const setDuration = usePlayerStore((state) => state.setDuration);
  const setCurrentTime = usePlayerStore((state) => state.setCurrentTime);

  // Mutation for saving playback progress to the server
  const { mutate: server_savePlaybackAction } = useMutation({
    mutationFn: savePlaybackAction,
    onSuccess: () => {
      console.log("Playback progress saved successfully.");
    },
    onError: (error) => {
      console.error("Error saving playback progress:", error);
    },
  });

  // Function to handle saving playback progress
  const handleSavePlayback = () => {
    try {
      server_savePlaybackAction({
        type: session?.user?.type!,
        id: podcastId.toString(),
        current_position: parseInt(currentTime.toString()),
        total_time: parseInt(duration.toString()),
      });
    } catch (error) {
      console.error("Error saving the playback:", error);
    }
    setPodcastId(null); // Reset podcast ID in the store
  };

  useEffect(() => {
    setIsRunning(false); // Ensure the player is not running initially
    setPodcastId(podcastId); // Set the current podcast ID in the store

    if (videoRef.current) {
      videoRef.current.currentTime = currentTime; // Set initial playback time

      // Set duration and update current time on loaded metadata
      videoRef.current.addEventListener("loadedmetadata", () => {
        setDuration(videoRef.current?.duration || 0);
      });

      // Update the current time in the store on time update
      videoRef.current.addEventListener("timeupdate", () => {
        setCurrentTime(videoRef.current?.currentTime || 0);
      });

      // Save playback progress on pause, ended, or seeked events
      videoRef.current.addEventListener("pause", handleSavePlayback);
      videoRef.current.addEventListener("ended", handleSavePlayback);
      videoRef.current.addEventListener("seeked", handleSavePlayback);
    }

    // Clean up event listeners on unmount
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("loadedmetadata", () => {});
        videoRef.current.removeEventListener("timeupdate", () => {});
        videoRef.current.removeEventListener("pause", handleSavePlayback);
        videoRef.current.removeEventListener("ended", handleSavePlayback);
        videoRef.current.removeEventListener("seeked", handleSavePlayback);
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTime, duration]);

  return (
    <div className="mx-auto aspect-video relative">
      <video
        ref={videoRef} // Attach the ref to the video element
        className="size-full object-cover rounded-md"
        controlsList="nodownload"
        poster={thumbnail}
        src={src}
        controls
      />
    </div>
  );
};

export default VideoPlayer;
