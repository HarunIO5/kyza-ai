'use client'

import {
    animate,
    useMotionTemplate,
    useMotionValue,
    motion,
  } from "framer-motion";
  import React, { ChangeEvent, useEffect, useRef, useState } from "react";
  import { MoveRight, Check } from 'lucide-react';
  import { useTheme } from "next-themes";
  
  const EmailInput = ({tool} : {tool: string}) => {

    const { theme, setTheme } = useTheme();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);
  
    if (!isMounted) {
      return null;
    }

    return (
      <div
        className="flex h-[200px] items-center justify-center dark:bg-black px-4"
      >
        {theme === "light" && (
            <LightBeamInput tool = {tool}/>
        )} 
        {theme === "dark" && (
            <BeamInput tool = {tool}/>
        )}
        
      </div>
    );
  };
  
  const BeamInput = ({tool} : {tool: string}) => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [waitlistError, setWaitlistError] = useState<boolean>(false)
    const [complete, setComplete] = useState<boolean>(false)

    const inputRef = useRef<HTMLInputElement | null>(null);
  
    const turn = useMotionValue(0);
  
    useEffect(() => {
      animate(turn, 1, {
        ease: "linear",
        duration: 5,
        repeat: Infinity,
      });
    }, []);
  
    const backgroundImage = useMotionTemplate`conic-gradient(from ${turn}turn, #a78bfa00 75%, #a78bfa 100%)`;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        setIsLoading(true)

        e.preventDefault();

        // console.log(inputRef.current?.value)

        const response = await fetch('/api/toolwaitlist', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'email': inputRef.current?.value,
                'tool': tool
            })
        })

        try {

            const responded = await response.json()

            if (responded) {
              // console.log('RESPONDED')
              // console.log(responded)
                setComplete(true)
            }

        } catch (err) {

            setWaitlistError(true)
            setIsLoading(false)

        } finally {
            setIsLoading(false)
        }
    }
  
    return (
      <form
        onSubmit={(e) => {handleSubmit(e)}}
        onClick={() => {
          inputRef.current?.focus();
        }}
        className="relative flex w-full max-w-md items-center gap-2 rounded-full border border-white/20 bg-gradient-to-br from-white/20 to-white/5 py-1.5 pl-6 pr-1.5"
      >
        <input
          ref={inputRef}
          type="email"
          required
          placeholder="Enter your email"
          className="w-full bg-transparent text-sm text-white placeholder-white/80 focus:outline-0"
        />

        {complete ? (
          <button
            disabled={complete}
            className="group flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-br from-gray-50 to-gray-400 px-4 py-3 text-sm font-medium text-gray-900 transition-transform active:scale-[0.985]"
          >
            <span>Thanks for joining</span>
            <Check className="-mr-4 opacity-0 transition-all group-hover:-mr-0 group-hover:opacity-100 group-active:-rotate-45" />
          </button>

        ) : (
          <button
            onClick={(e) => e.stopPropagation()}
            type="submit"
            disabled={isLoading}
            className="group flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-br from-gray-50 to-gray-400 px-4 py-3 text-sm font-medium text-gray-900 transition-transform active:scale-[0.985]"
          >
            <span>Join Waitlist</span>
            <MoveRight className="-mr-4 opacity-0 transition-all group-hover:-mr-0 group-hover:opacity-100 group-active:-rotate-45" />
          </button>
        )}
  
        
  
        <div className="pointer-events-none absolute inset-0 z-10 rounded-full">
          <motion.div
            style={{
              backgroundImage,
            }}
            className="mask-with-browser-support absolute -inset-[1px] rounded-full border border-transparent bg-origin-border"
          />
        </div>
      </form>
    );
  };


  const LightBeamInput = ({tool} : {tool: string}) => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [waitlistError, setWaitlistError] = useState<boolean>(false)
    const [complete, setComplete] = useState<boolean>(false)

    const inputRef = useRef<HTMLInputElement | null>(null);
  
    const turn = useMotionValue(0);
  
    useEffect(() => {
      animate(turn, 1, {
        ease: "linear",
        duration: 5,
        repeat: Infinity,
      });
    }, []);
  
    const backgroundImage = useMotionTemplate`conic-gradient(from ${turn}turn, #a78bfa00 75%, #a78bfa 100%)`;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        setIsLoading(true)

        e.preventDefault();

        const response = await fetch('/api/toolwaitlist', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'email': inputRef.current?.value,
                'tool': tool
            })
        })

        try {

            const responded = await response.json()

            if (responded) {
                setComplete(true)
            }

        } catch (err) {

            setWaitlistError(true)
            setIsLoading(false)

        } finally {
            setIsLoading(false)
        }
    }
  
    return (
      <form
        onSubmit={(e) => {handleSubmit(e)}}
        onClick={() => {
          inputRef.current?.focus();
        }}
        className="relative flex w-full max-w-md items-center gap-2 rounded-full border border-white/5 bg-gradient-to-br from-gray-50 to-gray-200  py-1.5 pl-6 pr-1.5"
      >
        <input
          ref={inputRef}
          type="email"
          required
          placeholder="Enter your email"
          className="w-full bg-transparent text-sm dark:text-white dark:placeholder-white/80 focus:outline-0"
        />
        {complete ? (
          <button
            onClick={(e) => e.stopPropagation()}
            disabled={complete}
            className="group flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-br from-gray-500 to-gray-900 px-4 py-3 text-sm font-medium text-slate-100 transition-transform active:scale-[0.985]"
          >
            <span>Thanks for joining</span>
            <Check className="-mr-4 opacity-0 transition-all group-hover:-mr-0 group-hover:opacity-100 group-active:-rotate-45" />
          </button>
        ) : (
          <button
            onClick={(e) => e.stopPropagation()}
            disabled={isLoading}
            type="submit"
            className="group flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-br from-gray-500 to-gray-900 px-4 py-3 text-sm font-medium text-slate-100 transition-transform active:scale-[0.985]"
          >
            <span>Join Waitlist</span>
            <MoveRight className="-mr-4 opacity-0 transition-all group-hover:-mr-0 group-hover:opacity-100 group-active:-rotate-45" />
          </button>
        )}
        
  
        <div className="pointer-events-none absolute inset-0 z-10 rounded-full">
          <motion.div
            style={{
              backgroundImage,
            }}
            className="mask-with-browser-support absolute -inset-[1px] rounded-full border border-transparent bg-origin-border"
          />
        </div>
      </form>
    );
  };
  
  export default EmailInput;