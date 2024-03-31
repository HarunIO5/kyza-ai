import { Metadata } from "next"
import Link from "next/link"

// import { UserRegisterForm } from "@/components/user-register-form"
import { UserRegisterForm } from "@/components/user-register"
import { Logo } from "@/components/icons"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { Button } from "@nextui-org/button"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Register",
  description: "Register Page",
}

export default async function RegisterPage() {
  const session = await getServerSession(authOptions)

  if(session) {
    redirect('/')
  }
  

  return (
    <>
      <div className="container h-screen w-screen flex-col items-center justify-center min-[340px]:grid sm:grid md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-black dark:border-r lg:flex">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://xlbwajpxfttzluwdymao.supabase.co/storage/v1/object/public/LandingPage/side%20image%20kyza%20login.JPEG)",
            }}
          />
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col items-center space-y-2 text-center">
            <Logo />
              <p className="text-sm text-muted-foreground">
                Enter your in your details below to create your account
              </p>
            </div>
            <Suspense>
              <UserRegisterForm />
            </Suspense>
            <Link
                href="/login"
                className="underline underline-offset-4 text-center hover:text-primary"
              >
              <Button variant={"light"}>
                Already have an account? Sign in Now!
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}