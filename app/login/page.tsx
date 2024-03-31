import { Metadata } from "next"
import Link from "next/link"
import { UserLoginForm } from "@/components/user-login"
import { Logo } from "@/components/icons"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { Button } from "@nextui-org/button"
import { ResetPasswordModal } from "@/components/reset-password"
import { Suspense } from "react"


export const metadata: Metadata = {
  title: "Login",
  description: "Login Page",
}

export default async function AuthenticationPage() {

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
            <div className="flex flex-row items-center justify-center gap-2 text-center">
              <Logo />
            </div>
            <Suspense>
              <UserLoginForm />
            </Suspense>
            <Link
                  href="/register"
                  className="underline underline-offset-4 text-center hover:text-primary"
                >
              <Button variant={"light"}>
                
                Need to create an account? Register now!
                
              </Button>
            </Link>
            <Suspense>
              <ResetPasswordModal />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  )
}