import AnimateDiffForm from "@/components/animate-diff-form";
import { title, subtitle } from "@/components/primitives";
import { WavesIcon } from "@/components/icons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getAnimateDiffOrder, getUser } from "@/lib/userFunctions";
import { Suspense } from "react";
import { checkCreditLimit, getTotalCreditCount } from "@/lib/credit-check";
import { Metadata } from "next";
import SSRGenerateForm from "@/components/ssr-generate-form";
import LoadingGeneratePage from "@/components/loading-generate";

export const metadata: Metadata = {
    title: `Generate AI Videos`
}

export default async function GeneratePage () {

    const session = await getServerSession(authOptions)

    // const animateDiffOrder = await getAnimateDiffOrder(session?.user?.email!) // GET RID AFTER CREDIT CHECK WORKS

    // const user = await getUser(session?.user?.email!) // GET RID AFTER CREDIT CHECK WORKS

    

    return (
        <div className="w-full h-full flex flex-col items-center justify-center py-12">
            <WavesIcon className="absolute -z-8 bottom-0 left-0 right-0 top-60 md:top-12 h-120% w-full opacity-40"/>
            <Suspense fallback={<LoadingGeneratePage />}>
                <SSRGenerateForm session={session!}/>
            </Suspense>
        </div>
    );
}