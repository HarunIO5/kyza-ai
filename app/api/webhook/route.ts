import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;
  
    let event: Stripe.Event;
  
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      )
    } catch (error: any) {
      return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
    }
  
    const session = event.data.object as Stripe.Checkout.Session;
    const userEmail = session?.customer_email;
    const productType = session?.metadata?.productType;
    const credit = session?.metadata?.credit;

    // console.log('Product type')
    // console.log(productType)
    // console.log(credit)
    // console.log(userEmail)
    // console.log(session)
  
    if (event.type === "checkout.session.completed") {
      if (!userEmail || !productType) {
        return new NextResponse(`Webhook Error: Missing metadata/email data`, { status: 400 });
      }
  
    //   await db.purchase.create({
    //     data: {
    //       courseId: courseId,
    //       userId: userId,
    //     }
    //   });

        const user = await prisma.user.findUnique({
            where: {
            email: userEmail!
            }
        })

        // console.log(user)

        // console.log('SESSION')
        // console.log(session)

        await prisma.oneTimePurchases.create({
            data: {
                productType: productType!,
                userId: user?.id!,
                products: session as any,
                status: 'Success',
                credits: Number(credit!)
            }
        })

        // DIFFERENAITE THIS FOR EVERY TYPE OF TOOL
        await prisma.user.update({
            where: {
                email: userEmail
            },
            data: {
                credits: Number(credit!)
            }
        })

    } else {
      return new NextResponse(`Webhook Error: Unhandled event type ${event.type}`, { status: 200 })
    }
  
    return new NextResponse(null, { status: 200 });
  }