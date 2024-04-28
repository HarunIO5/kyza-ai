// import { NextRequest, NextResponse } from "next/server";
// import { replicate } from "@/lib/replicate";
// import prisma from "@/lib/prisma";
// import { getUser, saveAnimateDiffVideos } from "@/lib/userFunctions";
// import { decrementalCreditLimit } from "@/lib/credit-check";
// import { utapi } from "@/lib/uploadthing";

// export async function POST(req: Request) {

//     // console.log("AnimateDIFF Inputs")

//     const {prompt, negative, scale, style, email} = await req.json()

//      if (output) {

//       const {data, error} = await utapi.uploadFilesFromUrl({url: output.toString(), name: prompt});

//       if (error) return NextResponse.json({error: `Couldn't uploaded video ${error}`}, {status: 400})


//       await saveAnimateDiffVideos({email: email as string, prompt: prompt as string, url: data?.url!, style: style as string, negativePrompt: negative as string, scale: scale.toString() })
//       await decrementalCreditLimit({email: email as string})

//     }         

//       return new NextResponse(JSON.stringify(output))

// }