import { checkCreditLimit, getTotalCreditCount } from "@/lib/credit-check";
import { Session } from "next-auth";
import AnimateDiffForm from "./animate-diff-form";
import TextToImageForm from "./text-to-image-form";

export default async function SSRGenerateTTIForm ({
    session,
}: {
    session: Session,
}) {

    let checkCredits
	let getCreditCount

	if (session) {
		checkCredits = await checkCreditLimit({email: session?.user?.email!, productType: "TextToImage"})

    	getCreditCount = await getTotalCreditCount({email: session?.user?.email!, productType: "TextToImage"})
	}

    return (
        <TextToImageForm session={session!} checkCreditLimit={checkCredits!} getCreditCount={getCreditCount!}/>
    );
}