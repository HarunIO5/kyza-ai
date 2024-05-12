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

                          <div className='relative w-full h-[110px] overflow-hidden rounded-xl border border-gray-800 p-[2px] backdrop-blur-3xl'>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <h2 className=" z-10 text-white text-xl font-bold">10 Generations</h2>
                                <h4 className=" z-10 text-white text-md font-normal">£2.99</h4>
                            </div>
                            <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' />
                            <div className='inline-flex h-full w-full items-center justify-center rounded-xl  px-3 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl' />
                          </div>

                          <div className='relative w-full h-[110px] overflow-hidden rounded-xl border border-gray-800 p-[2px] backdrop-blur-3xl'>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <h2 className=" z-10 text-white text-xl font-bold">50 Generations</h2>
                                <h4 className=" z-10 text-white text-md font-normal">£4.99</h4>
                            </div>
                            <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#69a4f9_0%,#0028ad_50%,#69a4f9_100%)]' />
                            <div className='inline-flex h-full w-full items-center justify-center rounded-xl  px-3 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl' />
                          </div>

                          <div className='relative w-full h-[110px] overflow-hidden rounded-xl border border-gray-800 p-[2px] backdrop-blur-3xl'>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <h2 className=" z-10 text-white text-xl font-bold">100 Generations</h2>
                                <h4 className=" z-10 text-white text-md font-normal">£8.99</h4>
                            </div>
                            <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#30ff9f_0%,#2d7556_50%,#30ff9f_100%)]' />
                            <div className='inline-flex h-full w-full items-center justify-center rounded-xl  px-3 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl' />
                          </div>

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
                        <Button className='relative inline-flex h-12 w-full overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50' disabled={isLoading} onClick={onSubscribe}>
                          <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' />
                          <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white dark:bg-gray-950 px-8 py-1 text-xl font-extrabold dark:text-gray-50 backdrop-blur-3xl'>
                            Purchase
                          </span>  
                        </Button>
                    </ModalBody>
                  </>
                )}
              </ModalContent>
            </Modal>
    );
  }