import { NextRequest, NextResponse } from "next/server";
import { replicate } from "@/lib/replicate";
import prisma from "@/lib/prisma";
import { getUser, saveAnimateDiffVideos } from "@/lib/userFunctions";
import { decrementalCreditLimit } from "@/lib/credit-check";

export async function POST(req: Request) {

    console.log("AnimateDIFF Inputs")

    const {prompt, negative, scale, style, email} = await req.json()

    // console.log(prompt)
    // console.log(negative)

    const output = await replicate.run(
        "lucataco/animate-diff:beecf59c4aee8d81bf04f0381033dfa10dc16e845b4ae00d281e2fa377e48a9f",
        {
          input: {
            path: style,
            seed: 255224557,
            steps: 25,
            prompt: prompt,
            n_prompt: negative,
            motion_module: "mm_sd_v14",
            guidance_scale: scale
          }
        }
      );

      console.log('ANIMATE DIFF')
      console.log(output);

      // const user = await getUser(email)

     if (output) {
      // await prisma.userSavedGenerations.create({
      //   data: {
      //     productType: 'animateDiff',
      //     prompt: prompt,
      //     model: 'AnimateDiff',
      //     url: output.toString(),
      //     userId: user?.id!,
      //     style: style
      //   }
      // })

      await saveAnimateDiffVideos({email: email as string, prompt: prompt as string, url: output.toString(), style: style as string })

      await decrementalCreditLimit({email: email as string})

    }         

      return new NextResponse(JSON.stringify(output))

}