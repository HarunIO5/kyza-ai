'use client'

import {
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    useDisclosure
  } from "@nextui-org/react";
  import {Card, CardFooter, CardHeader, CardBody, Select, SelectItem } from "@nextui-org/react";
  import { DownloadIcon } from "./icons";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

  export default function PricingModal ({onOpen, onOpenChange, session} : {onOpen: boolean, onOpenChange: () => void, session: Session}) {

    const [ price, setPrice ] = useState<string>('2.99')
    const [ isLoading, setIsLoading ] = useState<boolean>(false)

    const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPrice(e.target.value);
      };

    const router = useRouter()  
    const userEmail = session?.user?.email!

    const onSubscribe = async () => {

        let price_id
        let credit

        // console.log('PRICE')
        // console.log(price)

        if (price == "2.99" ) {
            price_id=process.env.NEXT_PUBLIC_STRIPE_ANIMATEDIFF_10_PRICE_ID
            credit = 10
        } else if (price == "4.99") {
            price_id=process.env.NEXT_PUBLIC_STRIPE_ANIMATEDIFF_50_PRICE_ID
            credit = 50
        } else if (price == "8.99") {
            price_id=process.env.NEXT_PUBLIC_STRIPE_ANIMATEDIFF_100_PRICE_ID
            credit = 100
        }

        // console.log('PRICE ID')
        // console.log(price_id)

      try {

        console.log("PRICE ID")
        console.log(price_id)
        console.log(credit)

        const purchaseObj = {
          email: userEmail,
          price_id: price_id,
          credit: credit, 
          product: "animateDiff"
        }

        setIsLoading(true);
        const response = await fetch("/api/stripe", {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({purchaseObj})
        });

        const url = await response.json()      

        console.log(url)
        window.location.href = url.url;
      } catch (error) {
        toast.error("Something went wrong");
        console.log("ERROR NO TOAST")
      } finally {
        setIsLoading(false);
        router.refresh()
      }
    }

    return (
            <Modal isOpen={onOpen} onOpenChange={onOpenChange} placement="center" size="3xl" backdrop="blur"  className=" overflow-auto">
              <ModalContent className="p-4 max-md:h-[575px]">
                {(onClose) => (
                  <>
                    <ModalBody className="flex flex-col items-center justify-center gap-4">
                        <p className="pb-8 text-center text-2xl font-bold">
                            Purchase a package to continue
                        </p>
                        <div className="w-full flex flex-col md:flex-row items-center md:justify-between gap-4">
                            <Card className=" bg-zinc-800 p-2 rounded-md w-full md:max-w-[300px]">
                                <CardHeader className="flex items-center justify-center text-violet-500">
                                    10 generations
                                </CardHeader>
                                <CardBody className="flex items-center justify-center">
                                    £2.99
                                </CardBody>
                            </Card>
                            <Card className=" bg-zinc-800 p-2 rounded-md w-full md:max-w-[300px]">
                                <CardHeader className="flex items-center justify-center text-violet-500">
                                    50 generations
                                </CardHeader>
                                <CardBody className="flex items-center justify-center">
                                    £4.99
                                </CardBody>
                            </Card>
                            <Card className=" bg-zinc-800 p-2 rounded-md w-full md:max-w-[300px]">
                                <CardHeader className="flex items-center justify-center text-violet-500">
                                    100 generations
                                </CardHeader>
                                <CardBody className="flex items-center justify-center">
                                    £8.99
                                </CardBody>
                            </Card>
                        </div>
                        <Select
                          label="Select a package"
                          variant="bordered"
                          color="secondary"
                          selectedKeys={[price]}
                          defaultSelectedKeys={['9.99']}
                          className="w-full"
                          onChange={handleSelectionChange}
                        >
                            <SelectItem key='2.99' value='2.99'>
                              £2.99
                            </SelectItem>
                            <SelectItem key='4.99' value='4.99'>
                              £4.99
                            </SelectItem>
                            <SelectItem key='8.99' value='9.99'>
                              £8.99
                            </SelectItem>
                        </Select>
                        <Button className="w-full" color="secondary" disabled={isLoading} onClick={onSubscribe}>
                            Purchase
                        </Button>
                    </ModalBody>
                  </>
                )}
              </ModalContent>
            </Modal>
    );
  }