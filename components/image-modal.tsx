'use client'

import {
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    useDisclosure
  } from "@nextui-org/react";
  import {Card, CardFooter, CardHeader, CardBody, Image, Button, Spinner, Divider} from "@nextui-org/react";
  import { DownloadIcon } from "./icons";
import Link from "next/link";

  export default function ImageModal ({onOpen, onOpenChange, srcName, srcUrl} : {onOpen: boolean, onOpenChange: () => void, srcName: string, srcUrl: string}) {
    return (
            <Modal isOpen={onOpen} onOpenChange={onOpenChange} placement="center" size="3xl" backdrop="blur">
              <ModalContent className="p-4">
                {(onClose) => (
                  <>
                    <ModalBody className="flex flex-col-reverse items-center md:flex-row md:items-start justify-between gap-4">
                      <div className="flex flex-col gap-4">
                        <p className="font-semibold text-xl">
                              Prompt:
                        </p>
                        <Card className=" bg-zinc-800 p-2 rounded-md max-w-[300px]">
                          <CardBody>
                              {srcName}
                          </CardBody>
                        </Card>
                        <Divider />
                        <h3 className="text-md font-medium text-zinc-400">
                          File Size:
                        </h3>
                        <p className="text-md font-semibold">
                          2.5MB
                        </p>
                      </div>
                        <div className="flex flex-col gap-2">
                            <video width="600" height="400" autoPlay loop className="h-[350px] md:h-[600px] w-[400px] object-cover rounded-md" playsInline muted preload="auto">
                              <source src={srcUrl} type="video/mp4" />
                              <track
                                src={srcUrl}
                              />
                              Your browser does not support the video tag.
                            </video>
                            <Link href={srcUrl} target="_blank" className="w-full">
                                <Button className="w-full">
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