import { NextRequest, NextResponse } from "next/server";
import { replicate } from "@/lib/replicate";
import prisma from "@/lib/prisma";
import {
  // getUser,
  saveGhiblifyImages,
} from "@/lib/userFunctions";
// import { decrementalCreditLimit } from "@/lib/credit-check";
import { utapi } from "@/lib/uploadthing";

export type ImageInfo = {
  image: string;
  key: string;
};

export async function POST(req: Request) {
  // console.log("AnimateDIFF Inputs")

  const { prompt, input_image, email } = await req.json();

  let quality: number;

  // if (speed == true) {
  //   quality = 20;
  // } else {
  //   quality = 80;
  // }

  console.log(prompt);
  console.log(input_image);
  // console.log(negative)
  // console.log(scale)
  // console.log(style)
  // console.log(email)

  const output = await replicate.run(
    "danila013/ghibli-easycontrol:6c4785d791d08ec65ff2ca5e9a7a0c2b0ac4e07ffadfb367231aa16bc7a52cbb",
    {
      input: {
        prompt: prompt,
        // n_prompt: negative,
        seed: -1,
        lora_weight: 1,
        guidance_scale: 3.5,
        num_inference_steps: 25,
        input_image: input_image,
      },
    }
  );

  console.log("GHIBLI EASY CONTROL");
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

  const returnedInfo = await saveGhiblifyImages({
    email: email as string,
    prompt: prompt as string,
    url: data?.url!,
    // negativePrompt: negative as string,
    // scale: scale.toString(),
    // aspectRatio: aspect_ratio.toString(),
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

  //   console.log("RETURNED INFO");
  //   console.log(returnedInfo);

  const dataReturned: ImageInfo = {
    image: returnedInfo.url,
    key: returnedInfo.key,
  };

  return new NextResponse(JSON.stringify(dataReturned));
}
