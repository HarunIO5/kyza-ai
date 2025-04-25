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
    <div className="relative w-full max-w-7xl mx-auto px-4">
      <div className="absolute top-0 flex w-full justify-center">
        <div className="left-0 h-[1px] animate-border-width rounded-full bg-gradient-to-r from-transparent via-foreground to-transparent transition-all duration-1000" />
      </div>
      <Accordion 
        className="w-full gap-4 bg-background text-foreground"
        variant="splitted"
      >
        <AccordionItem 
          key="1" 
          aria-label={faqTitle1} 
          title={faqTitle1}
          className="bg-background/40 backdrop-blur-sm"
        >
          {faqDescription1}
        </AccordionItem>
        <AccordionItem 
          key="2" 
          aria-label={faqTitle2} 
          title={faqTitle2}
          className="bg-background/40 backdrop-blur-sm"
        >
          {faqDescription2}
        </AccordionItem>
        <AccordionItem 
          key="3" 
          aria-label={faqTitle3} 
          title={faqTitle3}
          className="bg-background/40 backdrop-blur-sm"
        >
          {faqDescription3}
        </AccordionItem>
        <AccordionItem 
          key="4" 
          aria-label={faqTitle4} 
          title={faqTitle4}
          className="bg-background/40 backdrop-blur-sm"
        >
          {faqDescription4}
        </AccordionItem>
        <AccordionItem 
          key="5" 
          aria-label={faqTitle5} 
          title={faqTitle5}
          className="bg-background/40 backdrop-blur-sm"
        >
          {faqDescription5}
        </AccordionItem>
      </Accordion>
    </div>
  );
}