'use client'

import {
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    useDisclosure
  } from "@nextui-org/react";
  import {Card, CardFooter, CardHeader, CardBody, Image, Button, Spinner, Divider } from "@nextui-org/react";
  import { DownloadIcon } from "./icons";
import Link from "next/link";
import { useState } from "react";
import { Copy, Check, X } from "lucide-react";
import { useRouter } from "next/navigation";

  export default function ImageModal ({srcName, srcUrl, srcModel} : {srcName: string, srcUrl: string, srcModel?: string | 'Haiper' }) {

    const [isCopied, setIsCopied] = useState(false);

    const router = useRouter()
    const handleClose = () => router.back()

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

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
      localStorage.setItem('prompt',  srcName)
      router.push('/tools/text-to-video/generate')
    }
    
    const onDownload = async (url: string, name: string, model: string) => {
        const response = await fetch('/api/download', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({url: url, filename: name, model: model})
        })

        const downloadUrl = await response.json()

        window.open(downloadUrl.url, '_blank')
    }

    return (
            <Modal isOpen={true} onOpenChange={onOpenChange} onClose={handleClose} placement="center" size="3xl" backdrop="blur"  className="overflow-auto dark:bg-slate-900">
              <ModalContent className="p-4 max-md:h-[575px]">
                {(onClose) => (
                  <>
                    <ModalBody className="flex flex-col-reverse md:flex-row items-start justify-between gap-4">
                      <div className="flex flex-col gap-4">
                        <p className="font-semibold text-xl">
                              Prompt:
                        </p>
                        <Card className=" dark:bg-slate-950 p-2 rounded-md w-full md:max-w-[300px]">
                          <CardBody>
                              {srcName}
                              <div className="flex flex-row items-center gap-2 mt-4">
                                <Button className="w-fit bg-cyan-800" onClick={() => copyToClipboard(srcName)}>
                                  {isCopied ? (
                                    <Check className="h-7 w-7"/>
                                  ) : (
                                    <Copy className="h-7 w-7"/>
                                  )}
                                </Button>
                                <Button onClick={() => {onRemix()}} className='relative inline-flex w-fit items-center justify-center dark:bg-white font-medium text-gray-950 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50'>
                                  Remix
                                </Button>
                              </div>
                          </CardBody>
                        </Card>
                        <h3 className="text-md font-medium text-zinc-400">
                          Model:
                        </h3>
                        <p className="text-md font-semibold">
                          {srcModel || 'Haiper'}
                        </p>
                      </div>
                        <div className="flex flex-col gap-2">
                            <video autoPlay loop className="h-[250px] md:h-[600px] w-[400px] object-cover rounded-md" playsInline={true} muted preload="metadata">
                              <source src={srcUrl} type="video/mp4" />
                              <track
                                src={srcUrl + '#t=0.1'}
                              />
                              Your browser does not support the video tag.
                            </video>
                            <div className="w-full flex items-center justify-center">
                    {/* onClick={() => {onDownload(srcUrl, srcName, srcModel || 'Haiper')}} */}
                              {/* <Link href={``} target="_blank" className="w-fit"> */}
                                <Button className="w-fit dark:bg-slate-950" download={`${srcName}.mp4`} type="video/mp4">
                                    <DownloadIcon />
                                    Download
                                </Button>
                              {/* </Link> */}
                            </div>
                        </div>
                    </ModalBody>
                  </>
                )}
              </ModalContent>
            </Modal>
    );
  }