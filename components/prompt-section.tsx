'use client'

import { Button } from "@nextui-org/button";
import { Check, Copy } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PromptSectionComponent ({srcName} : {srcName: string}) {

    const [isCopied, setIsCopied] = useState(false);

    const router = useRouter()

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
        router.push('/text-to-video')
      }

    return (
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
    );
}