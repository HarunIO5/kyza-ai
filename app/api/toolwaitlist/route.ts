import { NextRequest, NextResponse } from "next/server";
// import { replicate } from "@/lib/replicate";
// import prisma from "@/lib/prisma";
// import { getUser, saveAnimateDiffVideos } from "@/lib/userFunctions";
// import { decrementalCreditLimit } from "@/lib/credit-check";
// import { utapi } from "@/lib/uploadthing";
import { saveToWailist } from "@/lib/userFunctions";

export async function POST(req: Request) {
  const { email, tool } = await req.json();

  // // const usernameUpdate = await updateUsername(email,)

  // console.log("API ROUTE - Username")
  // console.log(usernameUpdate)

  // if (usernameUpdate) return new NextResponse(JSON.stringify(usernameUpdate))

  const waitlist = await saveToWailist({ email: email, tool: tool });

  if (waitlist) return new NextResponse(JSON.stringify(waitlist));

  return new NextResponse("Failed to update username", { status: 400 });
}
