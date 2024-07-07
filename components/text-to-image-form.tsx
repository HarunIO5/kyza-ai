'use client'

import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader, Slider, SliderValue, useDisclosure, Select, SelectItem, Avatar, Selection,  cn, Switch, RadioGroup, Radio  } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { AlertCircle, Check, ExternalLink, Loader2, Sparkles, Rabbit, Turtle, Square, RectangleVertical, RectangleHorizontal } from "lucide-react";
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { textToImageSchema, textToVideoSchema } from "@/lib/validations/kyzaValidations";
import { z } from "zod"
import { Session } from "next-auth";
import Link from "next/link";
import PricingModal from "@/components/pricing-modal";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import { useRouter } from "next/navigation";
import {Spinner} from "@nextui-org/spinner";
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Typewriter } from 'react-simple-typewriter'
import { quantum } from 'ldrs'
import DownloadBtn from "@/components/download-btn"
import {Image} from "@nextui-org/image";
import NextImage from "next/image";



interface Style {
  id: number;
  name: string;
  description: string;
  photo: string;
  value: string;
  defaultPrompt: string;
  negativePrompt: string;
}

const styles: Style[] = [
  {
    id: 1,
    name: "Anime",
    description: "This style will generate your video in a vibrant anime-like video",
    photo: "https://xlbwajpxfttzluwdymao.supabase.co/storage/v1/object/public/tools/text-to-video/anime%20style.png",
    value: "toonyou_beta3.safetensors",
    defaultPrompt: "masterpiece, best quality, 1girl, solo, cherry blossoms, hanami, pink flower, white flower, spring season, wisteria, petals, flower, plum blossoms, outdoors, falling petals, white hair, black eyes",
    negativePrompt: "badhandv4, easynegative, ng_deepnegative_v1_75t, verybadimagenegative_v1.3, bad-artist, bad_prompt_version2-neg, teeth"
  },
  {
    id: 2,
    name: "Cartoon",
    description: "This style will generate your video in a vibrant anime-like video",
    photo: "https://xlbwajpxfttzluwdymao.supabase.co/storage/v1/object/public/tools/text-to-video/cartoon%20style.png",
    value: "rcnzCartoon3d_v10.safetensors",
    defaultPrompt: "Jane Eyre with headphones, natural skin texture,4mm,k textures, soft cinematic light, adobe lightroom, photolab, hdr, intricate, elegant, highly detailed, sharp focus, cinematic look, soothing tones, insane details, intricate details, hyperdetailed, low contrast, soft cinematic light, dim colors, exposure blend, hdr, faded",
    negativePrompt: "deformed, distorted, disfigured, poorly drawn, bad anatomy, wrong anatomy, extra limb, missing limb, floating limbs, mutated hands and fingers, disconnected limbs, mutation, mutated, ugly, disgusting, blurry, amputation"
  },
  {
    id: 3,
    name: "Artistic",
    description: "This style will generate your video in a vibrant anime-like video",
    photo: "https://xlbwajpxfttzluwdymao.supabase.co/storage/v1/object/public/tools/text-to-video/artistic%20style.png",
    value: "lyriel_v16.safetensors",
    defaultPrompt: "A forbidden castle high up in the mountains, pixel art, intricate details2, hdr, intricate details, hyperdetailed5, natural skin texture, hyperrealism, soft light, sharp, game art, key visual, surreal",
    negativePrompt: "3d, cartoon, anime, sketches, worst quality, low quality, normal quality, lowres, normal quality, monochrome, grayscale, watermark"
  },
  {
    id: 4,
    name: "Realistic v5",
    description: "This style will generate your video in a vibrant anime-like video",
    photo: "https://xlbwajpxfttzluwdymao.supabase.co/storage/v1/object/public/tools/text-to-video/realistic%20v5%20style.png",
    value: "majicmixRealistic_v5Preview.safetensors",
    defaultPrompt: "best quality, masterpiece, photorealistic, 1girl, light smile, shirt with collars, waist up, dramatic lighting, from below",
    negativePrompt: "nsfw, ng_deepnegative_v1_75t, badhandv4, worst quality, low quality, normal quality, lowres, watermark, monochrome"
  },
  {
    id: 5,
    name: "Realistic v10",
    description: "This style will generate your video in a vibrant anime-like video",
    photo: "https://xlbwajpxfttzluwdymao.supabase.co/storage/v1/object/public/tools/text-to-video/realistic%20v10%20style.png",
    value: "realisticVisionV40_v20Novae.safetensors",
    defaultPrompt: "photo of coastline, rocks, storm weather, wind, waves, lightning, 8k uhd, dslr, soft lighting, high quality, film grain, Fujifilm XT3",
    negativePrompt: "blur, haze, deformed iris, deformed pupils, semi-realistic, cgi, 3d, render, sketch, cartoon, drawing, anime, mutated hands and fingers, deformed, distorted, disfigured, poorly drawn, bad anatomy, wrong anatomy, extra limb, missing limb, floating limbs, disconnected limbs, mutation, mutated, ugly, disgusting, amputation"
  },
]

export default function TextToImageForm ({session, checkCreditLimit, getCreditCount} : {session: Session, checkCreditLimit?: boolean, getCreditCount?: number}) {

    const [ prompt, setPrompt ] = useState<string>('')
    const [ negative, setNegative ] = useState<string>('')
    const [ scale, setScale ] = useState<SliderValue>(7.5)
    const [ style, setStyle ] = useState<Selection>(new Set(["toonyou_beta3.safetensors"]))
    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [ genError, setGenLoading ] = useState<boolean>(false)
    const [ speed, setSpeed ] = useState<boolean>(false)
    const [ ratio, setRatio ] = useState<string>('3:2')
    const [ genImage, setGenImage ] = useState<string>('')
    const [ imageKey, setImageKey ] = useState<string>('')
    const [ isCopied, setIsCopied ] = useState<boolean>(false);
    const [ success, setSuccess ] = useState<boolean>(false)
    const [ videoError, setVideoError ] = useState<boolean>(false)


    const [emblaRef] = useEmblaCarousel({loop: true}, [Autoplay({delay: 2000})])

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const searchParams = useSearchParams();

    const router = useRouter()

    quantum.register()

    let loadPrompt: any

    if (typeof window !== 'undefined') {
      loadPrompt = localStorage.getItem('prompt')
    }

    // console.log("STYLE")
    
    const info = style as Set<any>

    let defaultPrompt: string;
    let defaultNegativePrompt: string;

    const selectedValue = Array.from(info)[0]; // Assuming there's only one value in the set

    const prompts = getPromptsByValue(selectedValue);
 
    if (loadPrompt) {
      defaultPrompt = loadPrompt
    } else {
      defaultPrompt = prompts.defaultPrompt;
    }

    defaultNegativePrompt = prompts.negativePrompt;

    // console.log("Default Prompt:", defaultPrompt);
    // console.log("Default Negative Prompt:", defaultNegativePrompt);

    const {register, handleSubmit, formState: {errors} } = useForm<z.infer<typeof textToImageSchema>>({
        resolver: zodResolver(textToImageSchema),
        values: {
          prompt: prompt,
          negative_prompt: negative
        }
    })

    // console.log("VALUES")
    // console.log(getValues())

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

        console.log(values)
        console.log(speed)
        console.log(ratio)

        const response = await fetch('/api/stableDiffuse', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'prompt': values.prompt,
                'negative': values.negative_prompt,
                'scale': scale,
                'spees': speed,
                'aspect_ratio': ratio,
                'email': session?.user?.email!
            })
        })

        try {
            
            const image = await response.json()

            // console.log("IMAGE")
            // console.log(image)

            if (image.image) {
                setGenImage(image.image)
                setImageKey(image.key)
            }
        } catch (error) {
            console.log(error)
            setVideoError(true)
            setIsLoading(false)
        } finally {
            setIsLoading(false)
            localStorage.removeItem('prompt')
            router.refresh()
        }   
    }

    // Function to get the prompts based on the selected value
    function getPromptsByValue(selectedValue: string): { defaultPrompt: string; negativePrompt: string } {
      const style = styles.find((s) => s.value === selectedValue);
    
      if (style) {
        return {
          defaultPrompt: style.defaultPrompt,
          negativePrompt: style.negativePrompt,
        };
      }
    
      return {
        defaultPrompt: '',
        negativePrompt: '',
      }
    }

    useEffect(() => {
        const negative_prompt = defaultNegativePrompt || ''
        const prompts = defaultPrompt || ''

        setPrompt(prompts)
        setNegative(negative_prompt)

    }, [style])

    // useEffect(() => {
    //     setCredits(user?.credits!)
    //     setFreeCredits(user?.freeCredits!)
    //     setTotalCredits(freeCredits + credit)
    // }, [genVideo])

    // const { onChange, onBlur, name, ref } = register('prompt');
    
    // console.log('REGISTER')


    useEffect(() => {

      async function firstGeneration ({prompt} : {prompt: string}) {
        setIsLoading(true)

        const response = await fetch('/api/stableDiffuse', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'prompt': prompt,
                'negative': "nsfw, ng_deepnegative_v1_75t, badhandv4, worst quality, low quality, normal quality, lowres, watermark, monochrome",
                'scale': scale,
                'spees': speed,
                'aspect_ratio': ratio,
                'email': session?.user?.email!
            })
        })

        try {
            
          const image = await response.json()

          // console.log("IMAGE")
          // console.log(image)

          if (image.image) {
              setGenImage(image.image)
              setImageKey(image.key)
          }
        } catch (error) {
            console.log(error)
            setVideoError(true)
            setIsLoading(false)
        } finally {
            setIsLoading(false)
            localStorage.removeItem('prompt')
            router.refresh()
        }
      }

      if (loadPrompt && session && !checkCreditLimit) {
        firstGeneration({prompt: loadPrompt})
      }
    }, [loadPrompt && session])

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

    return (
    <>
        <div className="w-3/4 md:h-full flex flex-col md:flex-row gap-8">
        {success && (
          <Confetti
          width={width!-50}
          height={height!}
          recycle={false}
        />
        )}
            <Card className="w-full h-full md:w-1/3 px-4 py-8 border-1 border-gray-300 dark:border-slate-700 dark:bg-black">
                {session && (
                  <CardHeader>
                  <span className='relative inline-block mx-auto overflow-hidden rounded-full p-[2px]'>
                    <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#53d1ff_0%,#ac4cf5_50%,#53d1ff_100%)]' />
                    <div className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white dark:bg-gray-950 px-3 py-1 text-sm font-medium dark:text-gray-50 backdrop-blur-3xl'>
                      <Sparkles className="h-5 w-5 inline fill-yellow-500 text-yellow-500"/> {getCreditCount} Credits Remaining
                    </div>
                  </span>
                </CardHeader>
                )}
                <CardBody className="w-full h-full flex flex-col justify-between gap-8">

                    {/* <Select
                      items={styles}
                      label="Choose Video Style"
                      placeholder="Select a style"
                      labelPlacement="outside"
                      selectedKeys={style}
                      className="max-w-lg"
                      onSelectionChange={setStyle}
                    >
                      {(style) => (
                        <SelectItem key={style.value} textValue={style.name} value={style.value}>
                          <div className="flex gap-2 items-center">
                            <Avatar alt={style.name} className="flex-shrink-0" size="sm" src={style.photo} />
                            <div className="flex flex-col">
                              <span className="text-small">{style.name}</span>
                            </div>
                          </div>
                        </SelectItem>
                      )}
                    </Select> */}

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
                    <div className="w-full h-full flex flex-col gap-8">
                      <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="w-full">
                              <Textarea type="text" label="Describe your video" value={prompt} labelPlacement="outside" placeholder="masterpiece, best quality, 1girl, solo, cherry blossoms, hanami, pink flower, white flower, spring season, wisteria, petals, flower, plum blossoms, outdoors, falling petals, white hair, black eyes" className="pb-4" {...register("prompt", {onChange: (e) => {
                                setPrompt(e.target.value)
                              }})}/>
                              {errors.prompt && (
                                  <span className=" text-red-500">{errors.prompt?.message}</span>
                              )}
                              <Textarea type="text" label="Negative prompt" value={negative} labelPlacement="outside" placeholder="bad-artist, bad_prompt" {...register("negative_prompt", {onChange: (e) => {
                                setNegative(e.target.value)
                              }})}/>
                              {errors.negative_prompt && (
                                  <span className=" text-red-500">{errors.negative_prompt?.message}</span>
                              )}
                          </div>
                          <div className="w-full flex flex-col gap-8 pt-6 pb-2">
                            <Switch
                              defaultSelected
                              isSelected={speed}
                              onChange={(e) => {
                                setSpeed(e.target.checked)
                              }}
                              size="lg"
                              color="secondary"
                              thumbIcon={({ isSelected, className }) =>
                                isSelected ? (
                                  <Rabbit className={'h-5 w-5 text-black'} />
                                ) : (
                                    <Turtle className={'h-5 w-5 text-black'} />
                                )}
                            > 
                              <p className="text-sm">
                                Slow or Fast
                              </p>
                              <p className=" text-xs text-foreground-500">
                                Select to receive your image quickier
                              </p>
                            </Switch>
                          </div>
                          <div className="w-full flex flex-col gap-8 pt-4 pb-4">
                            <RadioGroup
                              label="Select your image dimensions"
                              orientation="horizontal"
                              color="secondary"
                              defaultValue="3:2"
                              onChange={(e) => {
                                setRatio(e.target.value)
                              }}
                            >
                                <Radio value="3:2">
                                  <Square className="h-5 w-5" />
                                </Radio>
                                <Radio value="16:9">
                                  <RectangleHorizontal className="h-5 w-5" />
                                </Radio>
                                <Radio value="9:16">
                                  <RectangleVertical className="h-5 w-5" />
                                </Radio>
                              </RadioGroup>
                          </div>
                          <div className="w-full flex justify-end">
                              {(session && isLoading) && (
                                  <Button className='relative w-full my-4 inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50'>
                                    <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#53d1ff_0%,#ac4cf5_50%,#53d1ff_100%)]' />
                                    <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full px-8 py-1 text-md font-medium text-gray-50 backdrop-blur-3xl'>
                                      <Loader2 className="h-7 w-7 animate-spin text-white" />
                                    </span>
                                  </Button>
                              )} 
                              {(session && !isLoading && !checkCreditLimit) && (
                                  <Button className='relative w-full my-4 inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50' type="submit">
                                    <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#53d1ff_0%,#ac4cf5_50%,#53d1ff_100%)]' />
                                    <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full px-8 py-1 text-lg font-semibold text-gray-50 backdrop-blur-3xl'>
                                      Generate
                                    </span>
                                  </Button>
                              )}
                              {!session && (
                                  <Link href={'/login'} className="w-full">
                                      <Button className='relative w-full my-4 inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50' >
                                        <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#53d1ff_0%,#ac4cf5_50%,#53d1ff_100%)]' />
                                        <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full px-8 py-1 text-lg font-semibold text-gray-50 backdrop-blur-3xl'>
                                          Generate
                                        </span>
                                      </Button>
                                  </Link>
                              )}
                              {(session && checkCreditLimit) && (
                                  <Button className='relative w-full my-4 inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50' onClick={() => {onOpen()}}>
                                    <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#53d1ff_0%,#ac4cf5_50%,#53d1ff_100%)]' />
                                    <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full px-8 py-1 text-lg font-semibold text-gray-50 backdrop-blur-3xl'>
                                      Buy Credits
                                    </span>
                                  </Button>
                              )}
                          </div>
                      </form>       
                    </div>
                </CardBody>
            </Card>
            <Card className={cn("w-full flex items-center justify-center py-2 border-1 border-gray-300 dark:border-slate-700 dark:bg-black",  (isLoading && !videoError) && ' max-md:py-24')}>
                {(isLoading && !videoError) && (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <l-quantum
                      size="65"
                      speed="1.75" 
                      color="purple" 
                    ></l-quantum>
                    <span className="mt-4 font-medium mx-12">
                      {/* Style will be inherited from the parent element */}
                      <Typewriter
                        words={['"Have no fear of perfection, youll never reach it." - Salvador Dali', '"Design is intelligence made visible." - Alina Wheele', '"Make it simple, but significant." - Don Draper', '"The function of design is letting design function." - Micha Commeren']}
                        loop={false}
                        cursor
                        cursorStyle='_'
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={2000}
                      />
                    </span>
                  </div>
                )}
                {videoError && (
                  <Card className="border-1 border-red-500 bg-black p-2">

                    <CardBody className="flex flex-row gap-2 text-red-500">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        <p>Video generation failed, please try again.</p>
                    </CardBody>
                  </Card>
                )}
                {(!genImage && !isLoading && !videoError) && (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h2 className="text-white text-4xl font-extrabold z-10">Time To Create 🪄</h2>
                    </div>
                    <div className="embla mx-auto w-full" ref={emblaRef}>
                      <div className="embla__container w-full">

                        <div className="embla__slide flex items-center justify-center">
                            <Image
                                as={NextImage}
                                width={500}
                                height={1000}
                                src="https://xlbwajpxfttzluwdymao.supabase.co/storage/v1/object/public/tools/text-to-image/A_chicken_wearing_a_ski_mask_cause_up_logo_robbery.webp"
                                alt="A chicken wearing a ski mask cause up logo robbery"
                                className="h-full w-full object-cover blur-sm opacity-30"
                            />
                        </div>
                        <div className="embla__slide flex items-center justify-center">
                            <Image
                                as={NextImage}
                                width={500}
                                height={1000}
                                src="https://xlbwajpxfttzluwdymao.supabase.co/storage/v1/object/public/tools/text-to-image/a_humanoid_havana_brown_cat_wearing_inmate_orange_.webp"
                                alt="A humanoid Havana brown cat wearing inmate orange"
                                className="h-full w-full object-cover blur-sm opacity-30"
                            />
                        </div>
                        <div className="embla__slide flex items-center justify-center">
                            <Image
                                as={NextImage}
                                width={500}
                                height={1000}
                                src="https://xlbwajpxfttzluwdymao.supabase.co/storage/v1/object/public/tools/text-to-image/detailed.webp"
                                alt="A humanoid Havana brown cat wearing inmate orange"
                                className="h-full w-full object-cover blur-sm opacity-30"
                            />
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {(genImage && !videoError && !isLoading) && (
                  <>
                  <Card
                    isFooterBlurred
                    className={`${genImage ? 'visible' : 'hidden'} mb-4`}
                    key={`${genImage}`}

                    >
                      <Image
                          as={NextImage}
                          width={400}
                          height={400}
                          src={genImage}
                          alt={prompt}
                          className="h-full w-full object-cover"
                      />
                  </Card>
                  <div className="w-full flex items-center justify-center gap-4">
                    <DownloadBtn srcName={prompt} srcUrl={genImage} etx="webp"/>
                    <Button className="w-fit dark:bg-slate-800" onClick={() => copyToClipboard(`${process.env.NEXT_PUBLIC_BASE_URL}/media/${imageKey}`)}>
                      {isCopied && (
                        <Check className="h-7 w-7"/>
                      )}
                      {!isCopied && (
                        <p className="flex items-center gap-1.5">
                          <ExternalLink/>
                          Copy Link 
                        </p>
                      )}
                    </Button>
                  </div>
                  </>
                )}
              </Card>

        </div>
        <PricingModal onOpen={isOpen} onOpenChange={onOpenChange} session={session}/>
    </>
    );
}
