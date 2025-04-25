// import { checkCreditLimit, getTotalCreditCount } from "@/lib/credit-check";
// import { Session } from "next-auth";
import AnimateDiffForm from "./animate-diff-form";
import TextToImageForm from "./text-to-image-form";

export default async function SSRGenerateTTVForm() {
  // let checkCredits
  // let getCreditCount

  // if (session) {
  // 	checkCredits = await checkCreditLimit({email: session?.user?.email!, productType: "TextToVideo"})

  // 	getCreditCount = await getTotalCreditCount({email: session?.user?.email!, productType: "TextToVideo"})
  // }

  return <AnimateDiffForm />;
}
