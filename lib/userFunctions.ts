import prisma from "@/lib/prisma"

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

  await prisma.userSavedGenerations.create({
    data: {
      productType: 'animateDiff',
      prompt: prompt,
      model: 'AnimateDiff',
      url: url,
      userId: user?.id!,
      style: style,
      negativePrompt: negativePrompt,
      scale: scale
    }
  })

}  

export async function getSavedVideos({email, skip}: {email: string, skip: number}) {

  const user = await getUser(email)

  const videos = await prisma.userSavedGenerations.findMany({
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

  const videos = await prisma.userSavedGenerations.findMany({
    where: {
      userId: user?.id
    }
  })


  return videos.length

}