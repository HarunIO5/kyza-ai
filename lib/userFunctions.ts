import prisma from "@/lib/prisma"
import { nanoid } from 'nanoid'

export async function getUser (email:string) {

    const userInfo = await prisma.user.findUnique(
      {
        where: {
          email: email
        }
      }
    )
  
    // console.log("USER INFO")
    // console.log(userInfo)
  
    return userInfo
  }

  export async function updateUsername (email: string, username: string) {
    const usernameUpdate = await prisma.user.update({
      where: {
        email: email
      },
      data: {
        name: username
      }
    })

    console.log("SERVER SIDE - Update Username")
    console.log(usernameUpdate)

    return usernameUpdate
  }

  export async function getAnimateDiffOrder (email: string) {
    const user = await getUser(email)

    const animateDiffOrder = await prisma.oneTimePurchases.findFirst({
      where: {
        userId: user?.id,
        productType: "animateDiff"
      }
    })

    return animateDiffOrder

  }

export async function saveAnimateDiffVideos ({email, prompt, url, style, negativePrompt, scale}: {email: string, prompt: string, url: string, style: string, negativePrompt?: string, scale?: string}) {

  const user = await getUser(email)

  await prisma.generations.create({
    data: {
      prompt: prompt,
      model: 'AnimateDiff',
      url: url,
      userId: user?.id!,
      style: style,
      negativePrompt: negativePrompt,
      scale: scale,
      key: nanoid(),
    }
  })

}  

export async function getSavedVideos({email, skip}: {email: string, skip: number}) {

  const user = await getUser(email)

  const videos = await prisma.generations.findMany({
    where: {
      userId: user?.id
    },
    skip: skip,
    take: 9
  })


  return JSON.parse(JSON.stringify(videos))

}

export async function getNumberOfSavedVideos({email}: {email: string}) {

  const user = await getUser(email)

  const videos = await prisma.generations.findMany({
    where: {
      userId: user?.id
    }
  })


  return videos.length

}