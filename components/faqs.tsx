'use client'

import {Accordion, AccordionItem} from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function FAQs ({
  faqTitle1, 
  faqDescription1, 
  faqTitle2, 
  faqDescription2, 
  faqTitle3, 
  faqDescription3, 
  faqTitle4, 
  faqDescription4, 
  faqTitle5, 
  faqDescription5
} : {
  faqTitle1: string, 
  faqDescription1:  string, 
  faqTitle2: string, 
  faqDescription2: string, 
  faqTitle3: string, 
  faqDescription3: string, 
  faqTitle4: string, 
  faqDescription4: string, 
  faqTitle5: string, 
  faqDescription5: string
}) {
    
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
          <AccordionItem key="1" aria-label={faqTitle1} title={faqTitle1}>
              <p className=" text-content4-foreground">
                {faqDescription1}
              </p>
          </AccordionItem>
          <AccordionItem key="2" aria-label={faqTitle2} title={faqTitle2}>
              <p className=" text-content4-foreground">
                {faqDescription2}
              </p>
          </AccordionItem>
          <AccordionItem key="3" aria-label={faqTitle3} title={faqTitle3}>
              <p className=" text-content4-foreground">
                {faqDescription3}
              </p>
          </AccordionItem>
          <AccordionItem key="4" aria-label={faqTitle4} title={faqTitle4}>
              <p className=" text-content4-foreground">
                {faqDescription4}
              </p>
          </AccordionItem>
          <AccordionItem key="5" aria-label={faqTitle5} title={faqTitle5}>
              <p className=" text-content4-foreground">
                {faqDescription5}
              </p>
          </AccordionItem>
      </Accordion>
    </div>
  </div>
  );
}