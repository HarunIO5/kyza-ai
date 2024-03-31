
import VerifyEmailComponent from "@/components/verify-email-comp";
import { Suspense } from "react";

export default function VerifyEmailPage ({
    searchParams
}: {
    searchParams : { [key: string]: string | string[] | undefined }
}) {

    const token = typeof searchParams.token === 'string' ? searchParams.token : undefined

    return (
        <div className="flex flex-col min-h-screen py-2 text-center items-center justify-center">
            <Suspense key={`token=${token}`}>
                <VerifyEmailComponent token={token!}/>
            </Suspense>
        </div>
    );
}