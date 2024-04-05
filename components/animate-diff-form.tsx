'use client'

import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader, Slider, SliderValue, useDisclosure } from "@nextui-org/react";
import {RadioGroup, Radio} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { AlertCircle, Loader2, Sparkles } from "lucide-react";
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { textToVideoSchema } from "@/lib/validations/kyzaValidations";
import { z } from "zod"
import { Session } from "next-auth";
import Link from "next/link";
import PricingModal from "@/components/pricing-modal";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import { useRouter } from "next/navigation";

export default function AnimateDiffForm ({session, checkCreditLimit, getCreditCount} : {session: Session, checkCreditLimit?: boolean, getCreditCount?: number}) {

    const [ prompt, setPrompt ] = useState<string>('')
    const [ negative, setNegative ] = useState<string>('')
    const [ scale, setScale ] = useState<SliderValue>(7.5)
    const [ style, setStyle ] = useState<string>('toonyou_beta3.safetensors')
    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [ genError, setGenLoading ] = useState<boolean>(false)
    const [ genVideo, setGenVideo ] = useState<string>('')
    const [ success, setSuccess ] = useState<boolean>(false)
    const [ videoError, setVideoError ] = useState<boolean>(false)

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const searchParams = useSearchParams();

    const router = useRouter()

    const  {register, handleSubmit, formState: {errors}} = useForm<z.infer<typeof textToVideoSchema>>({
        resolver: zodResolver(textToVideoSchema),
    })

    useEffect(()=>{
      if (searchParams.get('success') == 'true') {
        setSuccess(true)
        toast.success('Successfully Purchased!', {
          style: {
            borderRadius: '10px',
          }
        });
      } else if (searchParams.get('cancelled') == 'true'){
        toast.error('Purchase Failed', {
          style: {
            borderRadius: '10px',
          }
        });
      }
    },[searchParams])

    const { width, height } = useWindowSize()

    const onSubmit = async (values: z.infer<typeof textToVideoSchema>, e?: React.BaseSyntheticEvent) => {
        e?.preventDefault()
        // console.log(prompt)
        // console.log(negative)

        setIsLoading(true)

        const response = await fetch('/api/animatediff', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'prompt': values.prompt,
                'negative': values.negative_prompt,
                'scale': scale,
                'style': style,
                'email': session?.user?.email!
            })
        })

        try {
            
            const video = await response.json()

            if (video) {
                setGenVideo(video)
                // console.log('VIDEO')
                // console.log(typeof(video))
                // console.log(genVideo)
            }
        } catch (error) {
            console.log(error)
            setVideoError(true)
            setIsLoading(false)
        } finally {
            setIsLoading(false)
            router.refresh()
        }   
    }

    // useEffect(() => {
    //     setCredits(user?.credits!)
    //     setFreeCredits(user?.freeCredits!)
    //     setTotalCredits(freeCredits + credit)
    // }, [genVideo])

    return (
    <>
        <div className="w-3/4 md:h-full flex flex-col md:flex-row gap-8">
        {success && (
          <Confetti
          width={width-50}
          height={height}
          recycle={false}
        />
        )}
            <Card className="w-full md:w-1/3 h-fit border-1 border-slate-700 bg-black">
                <CardHeader className=" text-gray-300 text-sm">
                    AnimateDiff
                </CardHeader>
                <CardBody className="w-full flex flex-col">
                    <Slider 
                      size="sm"
                      label="Select guidance scale"
                      minValue={0}
                      maxValue={10}
                      step={0.5}
                      defaultValue={7.5}
                      value={scale}
                      onChange={setScale}
                      classNames={{
                        base: "max-w-md gap-3",
                        track: "border-s-secondary-100",
                        filler: "bg-gradient-to-r from-secondary-100 to-secondary-500"
                      }}
                      renderThumb={(props) => (
                        <div
                          {...props}
                          className="group p-1 top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                        >
                          <span className="transition-transform bg-gradient-to-br shadow-small from-secondary-100 to-secondary-500 rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80" />
                        </div>
                      )}
                    />

                    <p className="pt-4 pb-2">Select your video style</p>
                    <RadioGroup
                      value={style}
                      onValueChange={setStyle}
                      
                      color="secondary"
                      defaultValue="toonyou_beta3.safetensors"
                    >
                      <Radio value="toonyou_beta3.safetensors">Anime</Radio>
                      <Radio value="rcnzCartoon3d_v10.safetensors">Cartoon</Radio>
                      <Radio value="lyriel_v16.safetensors">Artistic</Radio>
                      <Radio value="majicmixRealistic_v5Preview.safetensors">Realistic v5</Radio>
                      <Radio value="realisticVisionV40_v20Novae.safetensors">Realistic v10</Radio>
                    </RadioGroup>
                    
                    <p className={`${getCreditCount ? 'visible' : 'hidden'} text-md font-semibold pt-4`}>
                        <Sparkles className="h-5 w-5 inline fill-yellow-500 text-yellow-500"/> {getCreditCount} Credits Remaining
                    </p>
                </CardBody>
            </Card>
            <div className="w-full flex flex-col gap-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full">
                        <Textarea type="text" label="Describe your video" labelPlacement="outside" placeholder="masterpiece, best quality, 1girl, solo, cherry blossoms, hanami, pink flower, white flower, spring season, wisteria, petals, flower, plum blossoms, outdoors, falling petals, white hair, black eyes" className="pb-4" {...register("prompt")}/>
                        {errors.prompt && (
                            <span className=" text-red-500">{errors.prompt?.message}</span>
                        )}
                        <Textarea type="text" label="Negative prompt" labelPlacement="outside" placeholder="bad-artist, bad_prompt" {...register("negative_prompt")}/>
                        {errors.negative_prompt && (
                            <span className=" text-red-500">{errors.negative_prompt?.message}</span>
                        )}
                    </div>
                    <div className="w-full flex justify-end">
                        {(session && isLoading) && (
                            <Button className="w-fit my-4" color="secondary">
                                <Loader2 className="h-7 w-7 animate-spin text-white" />
                            </Button>
                        )} 
                        {(session && !isLoading && !checkCreditLimit) && (
                            <Button className="w-fit my-4" color="secondary" type="submit">
                                Generate
                            </Button>
                        )}
                        {!session && (
                            <Link href={'/login'}>
                                <Button className="w-fit my-4" color="secondary">
                                    Generate
                                </Button>
                            </Link>
                        )}
                        {(session && checkCreditLimit) && (
                            <Button className="w-fit my-4" color="secondary" onClick={() => {onOpen()}}>
                                Generate
                            </Button>
                        )}
                    </div>
                </form>
                {videoError && (
                  <Card className="border-1 border-red-500 bg-black p-2">
                    
                    <CardBody className="flex flex-row gap-2 text-red-500">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        <p>Video generation failed, please try again.</p>
                    </CardBody>
                  </Card>
                )}
                <Card
                  isFooterBlurred
                  className={`${genVideo ? 'visible' : 'hidden'}`}
                  key={`${genVideo}`}
                  
                  >
                    <video
                        className="h-full w-full object-cover"
                        preload="metadata"
                        poster={genVideo + '#t=0.1'}
                        autoPlay
                        playsInline
                        muted
                        loop
                    >
                        <source src={genVideo + '#t=0.1'} type="video/mp4" />
                        <track
                          src={genVideo}
                        />
                        Your browser does not support the video tag.
                    </video>
                </Card>        
            </div>
        </div>
        <PricingModal onOpen={isOpen} onOpenChange={onOpenChange} session={session}/>
    </>
    );
}