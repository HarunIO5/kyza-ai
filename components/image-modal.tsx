"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import {
  Card,
  CardFooter,
  CardHeader,
  CardBody,
  Image,
  Button,
  Spinner,
  Divider,
} from "@nextui-org/react";
import { DownloadIcon } from "./icons";
import Link from "next/link";
import { useState } from "react";
import { Copy, Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { saveAs } from "file-saver";
import DownloadBtn from "@/components/download-btn";

export default function ImageModal({
  srcName,
  srcUrl,
  srcModel,
  srcType,
}: {
  srcName: string;
  srcUrl: string;
  srcModel?: string | "Haiper";
  srcType?: string;
}) {
  const [isCopied, setIsCopied] = useState(false);

  const router = useRouter();
  const handleClose = () => router.back();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  };

  const onRemix = () => {
    localStorage.setItem("prompt", srcName);
    if (srcType === "SHORTVIDEO") {
      router.push("/tools/text-to-video/generate");
    } else if (srcType === "IMAGE") {
      router.push("/tools/text-to-image/generate");
    }
  };

  const saveFile = ({
    srcUrl,
    srcName,
  }: {
    srcUrl: string;
    srcName: string;
  }) => {
    saveAs(srcUrl, `${srcName}.mp4`);
  };

  return (
    <Modal
      isOpen={true}
      onOpenChange={onOpenChange}
      onClose={handleClose}
      placement="center"
      size="4xl"
      backdrop="blur"
      className="overflow-auto dark:bg-slate-900"
    >
      <ModalContent className="p-4 max-md:h-[575px]">
        {(onClose) => (
          <>
            <ModalBody className="flex flex-col-reverse md:flex-row items-start justify-between gap-4">
              <div className="flex flex-col gap-4 md:w-1/3">
                <p className="font-semibold text-xl">Prompt:</p>
                <Card className="dark:bg-slate-950 p-2 rounded-md w-full">
                  <CardBody>
                    {srcName}
                    <div className="flex flex-row items-center gap-2 mt-4">
                      <Button
                        className="w-fit bg-[#53d1ff]"
                        onClick={() => copyToClipboard(srcName)}
                      >
                        {isCopied ? (
                          <Check className="h-7 w-7" />
                        ) : (
                          <Copy className="h-7 w-7" />
                        )}
                      </Button>
                      <Button
                        onClick={() => {
                          onRemix();
                        }}
                        color="warning"
                        className="relative inline-flex w-fit items-center justify-center font-medium bg-[#ac4cf5] text-gray-950 dark:text-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50"
                      >
                        Remix
                      </Button>
                    </div>
                  </CardBody>
                </Card>
                {/* <h3 className="text-md font-medium text-zinc-400">Model:</h3>
                <p className="text-md font-semibold">{srcModel || "Haiper"}</p> */}
              </div>
              <div className="flex flex-col gap-2 md:w-2/3">
                {srcType === "SHORTVIDEO" && (
                  <div className="flex items-center justify-center w-full">
                    <video
                      autoPlay
                      loop
                      className="w-full h-auto max-h-[600px] rounded-md"
                      playsInline={true}
                      muted
                      preload="metadata"
                      controls
                    >
                      <source src={srcUrl} type="video/mp4" />
                      <track src={srcUrl + "#t=0.1"} />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
                {srcType === "IMAGE" && (
                  <div className="flex items-center justify-center w-full">
                    <Image
                      src={srcUrl!}
                      alt={srcName}
                      className="max-h-[600px] w-auto object-contain"
                      width={800}
                      height={800}
                    />
                  </div>
                )}
                <div className="w-full flex items-center justify-center mt-2">
                  <DownloadBtn
                    srcName={srcName}
                    srcUrl={srcUrl}
                    etx={srcType === "SHORTVIDEO" ? "mp4" : "webp"}
                  />
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
