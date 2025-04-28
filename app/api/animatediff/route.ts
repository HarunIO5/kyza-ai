import { NextRequest, NextResponse } from "next/server";
import { replicate } from "@/lib/replicate";
import prisma from "@/lib/prisma";
import { saveAnimateDiffVideos } from "@/lib/userFunctions";
import { utapi } from "@/lib/uploadthing";

export type VideoInfo = {
  video: any;
  key: string;
};

function extractPromptIfNeeded(inputString: string) {
  const promptPrefix = "Based on the following prompt:";

  // Check if the string contains the prefix
  if (inputString.includes(promptPrefix)) {
    // Extract everything after the prefix
    const indexOfPrefix = inputString.indexOf(promptPrefix);
    const extractedText = inputString
      .substring(indexOfPrefix + promptPrefix.length)
      .trim();
    return extractedText;
  } else {
    // If it doesn't contain the prefix, return the original string
    return inputString;
  }
}

export async function POST(req: Request) {
  // console.log("AnimateDIFF Inputs")
  try {
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

    console.log("OUTPUT WORKS");

    const videoResponse = await fetch(output.toString());

    const videoBlob = await videoResponse.blob();

    const videoFile = new File([videoBlob], `${prompt}.mp4`, {
      type: "video/mp4",
    });

    const uploadResponse = await utapi.uploadFiles([videoFile]);

    if (!uploadResponse?.[0]?.data?.url) {
      return NextResponse.json(
        { error: `Couldn't uploaded video` },
        { status: 400 }
      );
    }

    console.log("UPLOAD WORKS");

    const url = uploadResponse[0].data.url;

    const extractedPrompt = extractPromptIfNeeded(prompt);

    const returnedInfo = await saveAnimateDiffVideos({
      email: email as string,
      prompt: extractedPrompt as string,
      url: url,
      style: style as string,
      negativePrompt: negative as string,
      // scale: scale.toString(),
    });
    // await decrementalCreditLimit({
    //   email: email as string,
    //   productType: "TextToVideo",
    // });

    // console.log("ANIMATEDIFF")
    // console.log(returnedInfo)

    console.log("RETURNED INFO WORKS");

    const dataReturned: VideoInfo = {
      video: output,
      key: returnedInfo.key,
    };

    return new NextResponse(JSON.stringify(dataReturned));
  } catch (error) {
    console.error("Error in video generation: ", error);
    return NextResponse.json(
      { error: `Failed to generate video` },
      { status: 400 }
    );
  }
}
