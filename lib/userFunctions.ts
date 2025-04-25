import prisma from "@/lib/prisma";
import { nanoid } from "nanoid";

// export async function getUser(email: string) {
//   const userInfo = await prisma.user.findUnique({
//     where: {
//       email: email,
//     },
//   });

//   // console.log("USER INFO")
//   // console.log(userInfo)

//   return userInfo;
// }

// export async function updateUsername(email: string, username: string) {
//   const usernameUpdate = await prisma.user.update({
//     where: {
//       email: email,
//     },
//     data: {
//       name: username,
//     },
//   });

//   console.log("SERVER SIDE - Update Username");
//   console.log(usernameUpdate);

//   return usernameUpdate;
// }

// export async function getAnimateDiffOrder(email: string) {
//   const user = await getUser(email);

//   const animateDiffOrder = await prisma.oneTimePurchases.findFirst({
//     where: {
//       userId: user?.id,
//       productType: "animateDiff",
//     },
//   });

//   return animateDiffOrder;
// }

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

// export async function getSavedVideos({
//   email,
//   skip,
// }: {
//   email: string;
//   skip: number;
// }) {
//   const user = await getUser(email);

//   const videos = await prisma.generations.findMany({
//     where: {
//       userId: user?.id,
//     },
//     skip: skip,
//     take: 9,
//     orderBy: {
//       createdAt: "desc",
//     },
//   });

//   return JSON.parse(JSON.stringify(videos));
// }

// export async function getNumberOfSavedVideos({ email }: { email: string }) {
//   const user = await getUser(email);

//   const videos = await prisma.generations.findMany({
//     where: {
//       userId: user?.id,
//     },
//   });

//   return videos.length;
// }

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
