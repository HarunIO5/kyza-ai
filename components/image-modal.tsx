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

  export default function ImageModal ({onOpen, onOpenChange, srcName, srcUrl, srcModel} : {onOpen: boolean, onOpenChange: () => void, srcName: string, srcUrl: string, srcModel?: string | 'Haiper' }) {


    return (
            <Modal isOpen={onOpen} onOpenChange={onOpenChange} placement="center" size="3xl" backdrop="blur"  className=" overflow-auto">
              <ModalContent className="p-4 max-md:h-[575px]">
                {(onClose) => (
                  <>
                    <ModalBody className="flex flex-col-reverse md:flex-row items-start justify-between gap-4">
                      <div className="flex flex-col gap-4">
                        <p className="font-semibold text-xl">
                              Prompt:
                        </p>
                        <Card className=" bg-zinc-800 p-2 rounded-md w-full md:max-w-[300px]">
                          <CardBody>
                              {srcName}
                          </CardBody>
                        </Card>
                        <h3 className="text-md font-medium text-zinc-400">
                          Model:
                        </h3>
                        <p className="text-md font-semibold">
                          {srcModel}
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
                            <Link href={srcUrl} target="_blank" className="w-full">
                                <Button className="w-full" variant="ghost">
                                    <DownloadIcon />
                                </Button>
                            </Link>
                        </div>
                    </ModalBody>
                  </>
                )}
              </ModalContent>
            </Modal>
    );
  }