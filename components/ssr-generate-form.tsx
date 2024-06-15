import { checkCreditLimit, getTotalCreditCount } from "@/lib/credit-check";
import { Session } from "next-auth";
import AnimateDiffForm from "./animate-diff-form";

export default async function SSRGenerateForm ({
    session
}: {
    session: Session
}) {

    let checkCredits
	let getCreditCount

	if (session) {
		checkCredits = await checkCreditLimit({email: session?.user?.email!})

    	getCreditCount = await getTotalCreditCount({email: session?.user?.email!})
	}

    return (
        <AnimateDiffForm session={session!} checkCreditLimit={checkCredits!} getCreditCount={getCreditCount!}/>
    );
}