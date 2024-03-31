import AnimateDiffForm from "@/components/animate-diff-form";
import { title, subtitle } from "@/components/primitives";
import { WavesIcon } from "@/components/icons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getAnimateDiffOrder, getUser } from "@/lib/userFunctions";
import { Suspense } from "react";
import { checkCreditLimit, getTotalCreditCount } from "@/lib/credit-check";

export default async function TextToVideoPage () {

    const session = await getServerSession(authOptions)

    // const animateDiffOrder = await getAnimateDiffOrder(session?.user?.email!) // GET RID AFTER CREDIT CHECK WORKS

    // const user = await getUser(session?.user?.email!) // GET RID AFTER CREDIT CHECK WORKS

    let checkCredits
	let getCreditCount

	if (session) {
		checkCredits = await checkCreditLimit({email: session?.user?.email!})

    	getCreditCount = await getTotalCreditCount({email: session?.user?.email!})
	}

    return (
        <div className="w-full h-full flex flex-col items-center justify-center py-12">
            <WavesIcon className="absolute -z-8 bottom-0 left-0 right-0 top-60 md:top-12 h-120% w-full opacity-40"/>
            <div className="px-4 inline-block pb-12">
				<h1 className={title()}>Text to&nbsp;</h1>
				<h1 className={`${title()} inline-flex animate-text-gradient bg-gradient-to-r from-[#ac4cf5] via-[#53d1ff] to-[#dd61ff] bg-[200%_auto] bg-clip-text text-transparent`}>Video&nbsp;</h1>
	    	</div>
            <Suspense>
                <AnimateDiffForm session={session!} checkCreditLimit={checkCredits!} getCreditCount={getCreditCount!}/>
            </Suspense>
        </div>
    );
}