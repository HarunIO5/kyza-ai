"use client"

import { useState, useEffect } from "react";
import { UserCheck, UserX  } from 'lucide-react'
import Link from "next/link";
import { RequestEmailVerification } from "@/components/request-verify-email";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

export default function VerifyEmailComponent ({token}: {token: string})  {

    // const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail  = async () => {
        try {

            const response  = await fetch('/api/verifyemail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({token})
            })

            const verifiedResponse = await response.json()
            // console.log("Response")
            // console.log(verifiedResponse)
            if(!verifiedResponse.error) {
                setVerified(true)
            } else {
                setError(true)
            }    

        } catch (error: any) {
            setError(true)
            console.log(error)
        }
    }

    // useEffect(() => {
    //     const urlToken = window.location.search.split("=")[1];
    //     setToken(urlToken || "")
    // }, [])

    if (token.length > 0) {
        verifyUserEmail();
    }

    return (
        <>
            { verified && (
                <Card className="max-w-md p-4 border-green-500">
                    <UserCheck className="h-5 w-5 text-green-500" />
                    <CardHeader>Verification Successful</CardHeader>
                    <CardBody>
                        Thank you for verifying for your email!
                    </CardBody>
                    <div className="py-4">
                        <Link href={'/login'} >
                            <Button>
                                Click here to login
                            </Button>
                        </Link>
                    </div>    
                </Card>
            )}

            {error  && (
                <Card className="max-w-md border-1 border-red-500 bg-black p-4">
                    <UserX className="h-5 w-5 text-red-500" />
                    <CardHeader>Verification Failed</CardHeader>
                    <CardBody className="py-4">
                        Unfortunately verifying your email failed, please try request another link
                    </CardBody>
                    <RequestEmailVerification />
                </Card>
            )}
        </>
    );
}