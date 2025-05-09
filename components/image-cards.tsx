"use client";

import { Card, CardFooter, Image } from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";
import ImageModal from "./image-modal";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/navigation";
import { fetchSearchedVideos } from "@/app/_action";
import { SearchVideosType } from "@/app/(main)/media/page";
import Link from "next/link";

export default function VidCard({
  vidProp,
  search,
  videoLength,
}: {
  vidProp: SearchVideosType[];
  search: string;
  videoLength: number;
}) {
  const [srcName, setSrcName] = useState<string>("");
  const [srcUrl, setSrcUrl] = useState<string>("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [videos, setVideos] = useState(vidProp);
  const [videoSkip, setVideoSkip] = useState(0);
  const [ref, inView] = useInView();

  const router = useRouter();

  async function loadMoreVideos() {
    const skip = videoSkip + 12;
    const videos = await fetchSearchedVideos({ skip: skip, search: search });
    if (videos?.length) {
      setVideoSkip(skip);
      setVideos((prev: SearchVideosType[] | undefined) => [
        ...(prev?.length ? prev : []),
        ...videos,
      ]);
    }
  }

  useEffect(() => {
    if (inView) {
      loadMoreVideos();
    }
  }, [inView]);

  // console.log(videoSkip)
  // console.log(videoLength)

  return (
    <>
      <div className="w-full columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 p-4 space-y-4">
        {videos &&
          videos.map((file: SearchVideosType) => {
            return (
              <div key={file.key} className="break-inside-avoid mb-4">
                <Card
                  isFooterBlurred
                  className="rounded-xl w-full h-auto group"
                  isPressable={true}
                >
                  <Link href={`/media/${file.key}`} className="w-full">
                    {file.type === "SHORTVIDEO" && (
                      <video
                        className="w-full h-auto object-contain"
                        preload="metadata"
                        autoPlay
                        playsInline
                        muted
                        loop
                      >
                        <source src={file.url + "#t=0.1"} type="video/mp4" />
                        <track src={file.url} />
                        Your browser does not support the video tag.
                      </video>
                    )}
                    {file.type === "IMAGE" && (
                      <Image
                        src={file.url}
                        alt={file.prompt}
                        className="w-full h-auto object-contain"
                        width={800}
                        height={800}
                        removeWrapper
                      />
                    )}
                    {/* <CardFooter className="justify-start before:bg-white/10 border-white/20 border-1 overflow-hidden py-2 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                      <p className="text-tiny text-white/80">
                        {file.prompt.slice(0, 30)}...
                      </p>
                    </CardFooter> */}
                    <CardFooter className="absolute inset-x-0 bottom-0 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out flex items-center justify-center w-full p-4">
                      <p className="text-sm font-medium text-white drop-shadow-lg tracking-wide truncate text-center">
                        {file.prompt}
                      </p>
                    </CardFooter>
                  </Link>
                </Card>
              </div>
            );
          })}
      </div>
      {/* <ImageModal onOpen={isOpen} onOpenChange={onOpenChange} srcName={srcName} srcUrl={srcUrl}/> */}
      {/* loading spinner */}
      {videoLength > videoSkip + 12 && (
        <div
          ref={ref}
          className="col-span-1 mt-16 flex items-center justify-center sm:col-span-2 md:col-span-3 lg:col-span-4"
        >
          <svg
            aria-hidden="true"
            className="h-10 w-10 animate-spin fill-sky-600 text-gray-200 dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </>
  );
}
