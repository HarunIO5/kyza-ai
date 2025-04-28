import prisma from "@/lib/prisma";
import { nanoid } from "nanoid";

export async function saveAnimateDiffVideos({
  email,
  prompt,
  url,
  style,
  negativePrompt,
  scale,
}: {
  email?: string;
  prompt: string;
  url: string;
  style: string;
  negativePrompt?: string;
  scale?: string;
}) {
  // const user = await getUser(email);

  const video = await prisma.generations.create({
    data: {
      prompt: prompt,
      model: "Ray-Flash-2",
      url: url,
      userEmail: email || "", // Store just email if provided
      style: style,
      negativePrompt: negativePrompt,
      scale: scale,
      key: nanoid(),
    },
  });

  return JSON.parse(JSON.stringify(video));
}

export async function saveSD3Images({
  email,
  prompt,
  url,
  negativePrompt,
  scale,
  aspectRatio,
}: {
  email?: string;
  prompt: string;
  url: string;
  negativePrompt?: string;
  scale?: string;
  aspectRatio?: string;
}) {
  // const user = await getUser(email);

  const video = await prisma.generations.create({
    data: {
      prompt: prompt,
      model: "Flux-1.1-Pro",
      url: url,
      userEmail: email || "", // Store just email if provided
      negativePrompt: negativePrompt,
      scale: scale,
      key: nanoid(),
      aspectRatio: aspectRatio,
      outputFormat: "webp",
      type: "IMAGE",
    },
  });

  return JSON.parse(JSON.stringify(video));
}

export async function saveGhiblifyImages({
  email,
  prompt,
  url,
}: {
  email?: string;
  prompt: string;
  url: string;
}) {
  // const user = await getUser(email);

  const video = await prisma.generations.create({
    data: {
      prompt: prompt,
      model: "Ghiblify",
      url: url,
      userEmail: email || "", // Store just email if provided
      negativePrompt: "",
      scale: "",
      key: nanoid(),
      aspectRatio: "",
      outputFormat: "webp",
      type: "IMAGE",
    },
  });

  return JSON.parse(JSON.stringify(video));
}

export async function saveToWailist({
  email,
  tool,
}: {
  email: string;
  tool: string;
}) {
  const waitlist = await prisma.toolWaitlist.create({
    data: {
      email: email,
      toolType: tool as any,
    },
  });

  return waitlist;
}
