'use client'

import { textToVideoInputSchema } from "@/lib/validations/kyzaValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function TTIInputs () {

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const router = useRouter()

    const {register, handleSubmit, formState: {errors} } = useForm<z.infer<typeof textToVideoInputSchema>>({
        resolver: zodResolver(textToVideoInputSchema)
    })

    const onSubmit = async (values: z.infer<typeof textToVideoInputSchema>, e?: React.BaseSyntheticEvent) => {
        setIsLoading(true)
        e?.preventDefault()

        localStorage.setItem('prompt',  values.prompt)
        router.push('/tools/text-to-image/generate')
    }

    return (
        <div className="pt-4">
            <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="w-full">
                              <Textarea type="text" label="Describe your video" labelPlacement="outside" placeholder="masterpiece, best quality, 1girl, solo, cherry blossoms, hanami, pink flower, white flower, spring season, wisteria, petals, flower, plum blossoms, outdoors, falling petals, white hair, black eyes" className="pb-4" {...register("prompt")}/>
                              {errors.prompt && (
                                  <span className=" text-red-500">{errors.prompt?.message}</span>
                              )}
                          </div>
                          <div className="w-full flex justify-end">
                                <Button className='relative w-full my-4 inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50' type="submit" isLoading={isLoading}>
                                  <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#53d1ff_0%,#ac4cf5_50%,#53d1ff_100%)]' />
                                  <span className='inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full px-8 py-1 text-lg font-semibold text-gray-50 backdrop-blur-3xl'>
                                    Generate
                                  </span>
                                </Button>
                          </div>
                      </form>
        </div>
    );
}