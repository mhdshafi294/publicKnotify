"use client";

import React, { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSession } from "next-auth/react";
import { API_URL, PODCASTS, UPLOAD_MEDIA_FILE } from "@/lib/apiEndPoints";
import {
  BadgeInfoIcon,
  FileVideoIcon,
  ReplaceIcon,
  UploadIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "./input";
import Resumable from "resumablejs";

interface FileUploaderProps {
  endpoint?: string;
  uploadId?: string | null;
  initValue?: string;
  type: "audio" | "video";
  onUploadSuccess: () => void;
  onUploadError: (error: any) => void;
}

const DEFAULT_CHUNK_SIZE = 5 * 1024 * 1024; // 5MB

const FileUploader: React.FC<FileUploaderProps> = ({
  endpoint,
  uploadId,
  initValue,
  type,
  onUploadSuccess,
  onUploadError,
}) => {
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [lastUploadedChunk, setLastUploadedChunk] = useState<number>(0);
  const [fileName, setFileName] = useState<string>("");
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);
  const { data: session } = useSession();
  const resumableRef = useRef<Resumable | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (session?.user?.access_token && uploadId) {
      const resumable = new Resumable({
        target:
          endpoint || `${API_URL}podcaster${PODCASTS}${UPLOAD_MEDIA_FILE}`,
        query: { podcast_id: uploadId },
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${session.user.access_token}`,
        },
        chunkSize: DEFAULT_CHUNK_SIZE, // 5MB
        simultaneousUploads: 1,
        fileParameterName: "file",
        testChunks: true,
        chunkNumberParameterName: "resumableChunkNumber",
        totalChunksParameterName: "resumableTotalChunks",
        identifierParameterName: "resumableIdentifier",
        fileNameParameterName: "resumableFilename",
        totalSizeParameterName: "resumableTotalSize",
      });

      resumableRef.current = resumable;

      resumable.assignBrowse(fileInputRef.current!, false);

      resumable.on("fileAdded", (file) => {
        // console.log(file);
        console.log(file.file.type);
        console.log(type);
        console.log(type === "audio" && !file.file.type.startsWith("audio/"));
        if (
          (type === "audio" && !file.file.type.startsWith("audio/")) ||
          (type === "video" && !file.file.type.startsWith("video/"))
        ) {
          toast.error(`Invalid file type. Expected ${type}.`);
          resumable.removeFile(file);
          return;
        }

        setFileName(file.file.name);
        toast.loading("Uploading file...");
        toggleProgress();
        resumable.upload();
      });

      resumable.on("fileProgress", (file) => {
        const progress = Math.floor(file.progress(false) * 100);
        updateProgress(progress);

        // Update the last uploaded chunk number
        const chunkSize = resumable.opts.chunkSize ?? DEFAULT_CHUNK_SIZE;
        const uploadedChunks = Math.floor(
          (file.size * file.progress(false)) / chunkSize
        );
        setLastUploadedChunk(uploadedChunks);
      });

      resumable.on("fileSuccess", (file: any, response: any) => {
        toast.dismiss();
        toast.success("File uploaded successfully!");
        setUploadProgress(100);
        toggleProgress();
        onUploadSuccess();
        console.log(file, response);
        setTimeout(function () {
          window.location.reload();
        }, 3000);
      });

      resumable.on("fileError", (file, response) => {
        toast.dismiss();
        toast.error("Something went wrong. Please try again!");
        toggleProgress();
        onUploadError(response);
        console.error(response);
      });

      resumable.on("chunkingComplete", () => {
        if (lastUploadedChunk > 0) {
          resumable.uploadNextChunk();
        }
      });

      const handleOnline = () => {
        setIsOffline(false);
        if (resumable && resumable.files.length > 0) {
          resumable.upload();
        }
      };

      const handleOffline = () => {
        setIsOffline(true);
      };

      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, [
    session?.user?.access_token,
    uploadId,
    onUploadSuccess,
    onUploadError,
    type,
    lastUploadedChunk,
    endpoint,
  ]);

  const toggleProgress = () => {
    setUploadProgress(0);
  };

  const updateProgress = (value: number) => {
    setUploadProgress(value);
  };

  const handleFileChange = () => {
    const resumable = resumableRef.current;
    if (resumable && fileInputRef.current?.files?.length) {
      const file = fileInputRef.current.files[0];
      const uniqueIdentifier = `${file.name}-${file.size}`;
      const existingFile = resumable.getFromUniqueIdentifier(uniqueIdentifier);

      // Correctly handle the return value of getFromUniqueIdentifier
      if (existingFile !== undefined && existingFile !== null) {
        resumable.removeFile(existingFile);
      }
      resumable.addFile(file);
    }
  };

  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger disabled={typeof uploadId !== "string"} asChild>
            <div className="relative cursor-pointer w-full h-10">
              <Input
                id="fileInput"
                ref={fileInputRef}
                disabled={
                  (uploadProgress > 0 && uploadProgress < 100) ||
                  typeof uploadId !== "string"
                }
                className={cn(
                  "w-full absolute bg-greeny top-0 left-0 opacity-0 disabled:opacity-0 cursor-pointer z-20"
                )}
                type="file"
                onChange={handleFileChange}
              />
              <div className="absolute top-0 left-0 w-full h-full bg-greeny rounded flex justify-center items-center z-10">
                {uploadProgress > 0 && uploadProgress < 100 ? (
                  <div className="flex flex-col w-full px-4 pb-2 items-center gap-1 mt-2">
                    <div className="flex w-full justify-center items-center gap-1 relative">
                      <div className="absolute start-4 flex gap-2 items-center">
                        <FileVideoIcon color="black" className="" size={16} />
                        <p className="text-sm text-black font-bold ">
                          {fileName}
                        </p>
                      </div>
                      <p className="text-sm text-black font-bold">
                        {uploadProgress}%
                      </p>
                    </div>
                    <Progress
                      className="w-full h-2 bg-greeny"
                      value={uploadProgress}
                    />
                  </div>
                ) : initValue ? (
                  <div className="flex justify-center items-center gap-2">
                    <FileVideoIcon color="black" className="absolute start-4" />
                    <ReplaceIcon color="black" size={16} />
                    <p className="text-black font-semibold text-xs md:text-sm">
                      {initValue.length > 20
                        ? initValue.slice(0, 14) + "..." + initValue.slice(-3)
                        : initValue}
                    </p>
                  </div>
                ) : (
                  <UploadIcon color="black" />
                )}
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent className="flex items-center gap-1 bg-primary">
            <BadgeInfoIcon size={16} />
            <p className="font-medium text-base">
              Ensure that you saved the podcast data as a draft before you can
              upload your podcast
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {isOffline && (
        <div className="text-red-600">
          You are offline. The upload will resume once the connection is
          restored.
        </div>
      )}
    </div>
  );
};

export default FileUploader;