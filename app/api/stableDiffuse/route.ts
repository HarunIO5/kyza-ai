import { NextRequest, NextResponse } from "next/server";
import { replicate } from "@/lib/replicate";
import prisma from "@/lib/prisma";
import {
  getUser,
  saveAnimateDiffVideos,
  saveSD3Images,
} from "@/lib/userFunctions";
import { decrementalCreditLimit } from "@/lib/credit-check";
import { utapi } from "@/lib/uploadthing";

export type ImageInfo = {
  image: string;
  key: string;
};

export async function POST(req: Request) {
  // console.log("AnimateDIFF Inputs")

  const { prompt, negative, email, aspect_ratio } = await req.json();

  let quality: number;

  // if (speed == true) {
  //   quality = 20;
  // } else {
  //   quality = 80;
  // }

  // console.log(prompt)
  // console.log(negative)
  // console.log(scale)
  // console.log(style)
  // console.log(email)

  const output = await replicate.run("black-forest-labs/flux-1.1-pro", {
    input: {
      prompt: prompt,
      // n_prompt: negative,
      output_format: "webp",
      output_quality: 100,
      // cfg: scale,
      aspect_ratio: aspect_ratio,
      safety_tolerance: 2,
      prompt_upsampling: true,
    },
  });

  console.log("FLUX 1.1 PRO");
  console.log(output);

  if (!output) {
    return new NextResponse("Failed to generate image", { status: 400 });
  }

  const { data, error } = await utapi.uploadFilesFromUrl({
    url: output.toString(),
    name: prompt,
  });

  if (error)
    return NextResponse.json(
      { error: `Couldn't uploaded image ${error}` },
      { status: 400 }
    );

  const returnedInfo = await saveSD3Images({
    email: email as string,
    prompt: prompt as string,
    url: data?.url!,
    negativePrompt: negative as string,
    // scale: scale.toString(),
    aspectRatio: aspect_ratio.toString(),
  });
  // await decrementalCreditLimit({
  //   email: email as string,
  //   productType: "TextToImage",
  // });

  if (returnedInfo.error || returnedInfo.url == null || !returnedInfo) {
    return NextResponse.json(
      { error: `Couldn't uploaded image to DB` },
      { status: 400 }
    );
  }

  const dataReturned: ImageInfo = {
    image: returnedInfo.url,
    key: returnedInfo.key,
  };

  return new NextResponse(JSON.stringify(dataReturned));
}
