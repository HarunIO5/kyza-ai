'use client'

import {Accordion, AccordionItem} from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function FAQs () {
    
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
     return null;
  }

  return (
    <div className='relative'>
        <div className='absolute top-0 flex w-full justify-center'>
            <div className='left-0 h-[1px] animate-border-width rounded-full bg-gradient-to-r from-[rgba(17,17,17,0)] via-black to-[rgba(17,17,17,0)] dark:from-[rgba(17,17,17,0)] dark:via-white dark:to-[rgba(17,17,17,0)] transition-all duration-1000' />
        </div>
        <div className='flex h-full items-center justify-center rounded-md border border-gray-300 dark:border-gray-800 bg-gradient-to-b from-gray-100 to-white dark:from-gray-950 dark:to-black px-3 py-2'>
            <Accordion>
            <AccordionItem key="1" aria-label="How does Kyza.ai differentiate itself from other Text-to-Video platforms?" title="How does Kyza.ai differentiate itself from other Text-to-Video platforms?">
            <p className=" text-content4-foreground">
              Kyza.ai stands out through its advanced natural language processing algorithms, which enable it to generate highly accurate and contextually relevant video content.
            </p>
            </AccordionItem>
            <AccordionItem key="2" aria-label="Can Kyza.ai accommodate specific industry requirements or niche content?" title="Can Kyza.ai accommodate specific industry requirements or niche content?">
            <p className=" text-content4-foreground">
              Absolutely. Kyza.ai is designed to be versatile, allowing users to input various types of content.
            </p>
            </AccordionItem>
            <AccordionItem key="3" aria-label="What level of control do users have over the visual and auditory elements?" title="What level of control do users have over the visual and auditory elements?">
            <p className=" text-content4-foreground">
              Kyza.ai provides users with extensive customization options. Users can upload custom images, logos, and voiceovers to personalise their videos.
            </p>
            </AccordionItem>
            <AccordionItem key="4" aria-label="How does Kyza.ai ensure the quality and accuracy of the generated videos?" title="How does Kyza.ai ensure the quality and accuracy of the generated videos?">
            <p className=" text-content4-foreground">
              Our platform undergoes rigorous testing and refinement processes to optimise language processing capabilities, ensuring that the generated videos are grammatically correct, coherent, and contextually relevant.
            </p>
            </AccordionItem>
            <AccordionItem key="5" aria-label="What is Kyza.ai's refund policy in case users encounter issues?" title="What is Kyza.ai's refund policy in case users encounter issues?">
            <p className=" text-content4-foreground">
              Kyza.ai offers a satisfaction guarantee to its users. If for any reason you are not satisfied with our service, please contact our customer support team within 7 days of your purchase, and we will work with you to address your concerns.
            </p>
            </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}