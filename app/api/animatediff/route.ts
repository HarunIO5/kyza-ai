import { NextRequest, NextResponse } from "next/server";
import { replicate } from "@/lib/replicate";
import prisma from "@/lib/prisma";
import { getUser, saveAnimateDiffVideos } from "@/lib/userFunctions";
import { decrementalCreditLimit } from "@/lib/credit-check";
import { utapi } from "@/lib/uploadthing";

export type VideoInfo = {
  video: any;
  key: string;
};

export async function POST(req: Request) {
  // console.log("AnimateDIFF Inputs")

  const { prompt, negative, scale, style, email } = await req.json();

  // console.log(prompt)
  // console.log(negative)
  // console.log(scale)
  // console.log(style)
  // console.log(email)

  const output = await replicate.run("luma/ray-flash-2-720p", {
    input: {
      // path: style,
      // seed: 255224557,
      // steps: 25,
      prompt: prompt,
      // n_prompt: negative,
      aspect_ratio: "16:9",
      duration: 5,
      // motion_module: "mm_sd_v14",
      // guidance_scale: scale,
    },
  });

  console.log("ANIMATE DIFF");
  console.log(output);

  if (!output) {
    return new NextResponse("Failed to generate video", { status: 400 });
  }

  const { data, error } = await utapi.uploadFilesFromUrl({
    url: output.toString(),
    name: prompt,
  });

  if (error)
    return NextResponse.json(
      { error: `Couldn't uploaded video ${error}` },
      { status: 400 }
    );

  const returnedInfo = await saveAnimateDiffVideos({
    email: email as string,
    prompt: prompt as string,
    url: data?.url!,
    style: style as string,
    negativePrompt: negative as string,
    scale: scale.toString(),
  });
  await decrementalCreditLimit({
    email: email as string,
    productType: "TextToVideo",
  });

  // console.log("ANIMATEDIFF")
  // console.log(returnedInfo)

  const dataReturned: VideoInfo = {
    video: output,
    key: returnedInfo.key,
  };

  return new NextResponse(JSON.stringify(dataReturned));
}
