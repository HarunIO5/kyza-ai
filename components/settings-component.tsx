'use client'

import { settingSchema } from "@/lib/validations/kyzaValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Avatar } from "@nextui-org/react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function SettingsComponent ({email, name, image}: {email: string, name: string, image?: any}) {

    const [username, setUsername] = useState<String>(name)
    const [updateIsLoading, setUpdateIsLoading] = useState<boolean>(false)
    const [updateLoadingError, setUpdateLoadingError] = useState<boolean>(false)

    const router = useRouter()

    const {register, handleSubmit, formState: {errors}} = useForm<z.infer<typeof settingSchema>>({
        resolver: zodResolver(settingSchema),
    })

    const onSubmit = async (values: z.infer<typeof settingSchema>, e?: React.BaseSyntheticEvent) => {
        e?.preventDefault()

        const response = await fetch('/api/settings', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'username': values.username,
            })
        })

        try {
            
            const video = await response.json()

            if (video) {
                setUsername(video)
                // console.log('VIDEO')
                // console.log(typeof(video))
                // console.log(genVideo)
            }
        } catch (error) {
            console.log(error)
            setUpdateLoadingError(true)
            setUpdateIsLoading(false)
        } finally {
            setUpdateIsLoading(false)
            router.refresh()
        }

    }    

    return (
        <div className="w-full flex flex-col gap-8 items-center justify-center">
            <Avatar
                isBordered
                as="button"
                showFallback
                name={name!}
                className="w-20 h-20 text-large transition-transform"
                src={image!}
            />
            <Input
                isDisabled
                type="email"
                label="Email"
                defaultValue={email!}
                className="max-w-md"
            />
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center justify-center gap-8">
                <Input
                    type="text"
                    label="Username"
                    defaultValue={name!}
                    className="max-w-md"
                    {...register("username")}
                />
                {errors.username && (
                    <span className=" text-red-500">{errors.username?.message}</span>
                )}
                <div className="w-full flex justify-center">
                    {updateIsLoading ? (
                        <Button className="w-fit my-4" color="secondary">
                            <Loader2 className="h-7 w-7 animate-spin text-white" />
                        </Button>
                    ): (
                        <Button className="w-fit my-4" color="secondary" type="submit">
                            Update
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
}