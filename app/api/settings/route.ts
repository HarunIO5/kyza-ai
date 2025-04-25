import { NextRequest, NextResponse } from "next/server";
// import { replicate } from "@/lib/replicate";
// import prisma from "@/lib/prisma";
// import { getUser, saveAnimateDiffVideos } from "@/lib/userFunctions";
// import { decrementalCreditLimit } from "@/lib/credit-check";
// import { utapi } from "@/lib/uploadthing";
import prisma from "@/lib/prisma";
// import { updateUsername } from "@/lib/userFunctions";

export async function POST(req: Request) {
  //     // console.log("AnimateDIFF Inputs")
  // const {username, email} = await req.json()
  // // console.log(email)
  // // console.log(username)
  // const user = await prisma.user.findUnique({
  //     where: {
  //       email: email
  //     }
  //   })
  // console.log("API ROUTE - Find User")
  // console.log(user)
  // if (!user) {
  //     return new NextResponse("User doesn't exist", { status: 404 });
  // }
  // const usernameUpdate = await updateUsername(email, username)
  // console.log("API ROUTE - Username")
  // console.log(usernameUpdate)
  // if (usernameUpdate) return new NextResponse(JSON.stringify(usernameUpdate))
  // return new NextResponse("Failed to update username", {status: 400})
}
