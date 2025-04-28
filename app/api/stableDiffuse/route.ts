import { NextRequest, NextResponse } from "next/server";
import { replicate } from "@/lib/replicate";
import prisma from "@/lib/prisma";
import {
  // getUser,
  saveSD3Images,
} from "@/lib/userFunctions";
// import { decrementalCreditLimit } from "@/lib/credit-check";
import { utapi } from "@/lib/uploadthing";

export type ImageInfo = {
  image: string;
  key: string;
};

function processPrompt(inputString: string) {
  // Check if input is a valid string
  if (typeof inputString !== "string") {
    return inputString;
  }

  const promptPrefix = "Based on the following prompt:";

  // Check if the string contains the prefix
  if (inputString.indexOf(promptPrefix) !== -1) {
    // Extract everything after the prefix
    const parts = inputString.split(promptPrefix);
    if (parts.length > 1) {
      return parts[1].trim();
    }
  }

  // If no prefix or splitting failed, return the original
  return inputString;
}

export async function POST(req: Request) {
  // console.log("AnimateDIFF Inputs")
  try {
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

    console.log("OUTPUT WORKS");

    const imageResponse = await fetch(output.toString());

    if (!imageResponse.ok) {
      return new NextResponse("Failed to generate image", { status: 400 });
    }

    console.log("IMAGE RESPONSE WORKS");

    const imageBlob = await imageResponse.blob();

    const imageFile = new File([imageBlob], `${prompt}.webp`, {
      type: "image/webp",
    });

    const uploadResponse = await utapi.uploadFiles([imageFile]);

    console.log("UPLOAD RESPONSE WORKS", uploadResponse);

    if (!uploadResponse?.[0]?.data?.url) {
      return NextResponse.json(
        { error: `Couldn't uploaded image` },
        { status: 400 }
      );
    }

    console.log("UPLOAD RESPONSE WORKS");

    const url = uploadResponse[0].data.url;

    const extractedPrompt = processPrompt(prompt);
    console.log("EXTRACTED PROMPT WORKS", extractedPrompt);

    const returnedInfo = await saveSD3Images({
      email: email as string,
      prompt: extractedPrompt as string,
      url: url,
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

    console.log("RETURNED INFO WORKS");

    const dataReturned: ImageInfo = {
      image: returnedInfo.url,
      key: returnedInfo.key,
    };

    return new NextResponse(JSON.stringify(dataReturned));
  } catch (error) {
    console.error("Error in image generation: ", error);
    return NextResponse.json(
      { error: `Failed to generate image` },
      { status: 400 }
    );
  }
}
