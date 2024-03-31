"use client"

import * as React from "react"
import { signIn } from 'next-auth/react'
import { AlertCircle, FileWarning, Terminal, Loader2 } from "lucide-react"
import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import { redirect, useRouter } from "next/navigation"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"

import { loginFormSchema } from "@/lib/validations/kyzaValidations"
import { z } from "zod"
import { useEffect } from "react"
import { Card, CardBody, CardHeader } from "@nextui-org/react"
import { GoogleIcon } from "./icons"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserLoginForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [loginError, setLoginError] = React.useState<boolean>(false)
  const [isMounted, setIsMounted] = React.useState(false);

  const  {register, handleSubmit, formState: {errors}} = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  })

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  let errorMessage = false

  async function onSubmit(values: z.infer<typeof loginFormSchema>, e?: React.BaseSyntheticEvent) {
    e?.preventDefault()
    setIsLoading(true)

    const status  = await signIn("credentials", {
      ...values,
      redirect: false,
    })

    if(status?.error === null){
      router.push('/')
    } else {
      setLoginError(true)
      setIsLoading(false)
    }
  }

  return (
    <div className={"grid gap-6"} {...props}>
      {loginError && (
        <Card className="border-1 border-red-500 bg-black p-2">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <CardBody className="text-red-500">
            Your email or password is incorrect, please try again.
          </CardBody>
        </Card>
      )}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
            <Input type="email" label="Email" labelPlacement="inside" placeholder="name@example.com" id="email" {...register("email")}/>
            {errors.email && (
                <span className="flex text-red-500">{errors.email?.message}</span>
            )}
            <Input id="password" type="password" label="Password" labelPlacement="inside" {...register("password")}/>
            {errors.password && (
                <span className="flex text-red-500">{errors.password?.message}</span>
            )}
            <Button disabled={isLoading} type="submit" className="w-full">
                {isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign In with Email
            </Button>
        </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="bordered" type="button" disabled={isLoading} onClick={() => signIn('google')}>
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <GoogleIcon className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  )
}