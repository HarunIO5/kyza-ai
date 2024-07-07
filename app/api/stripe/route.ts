import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    const params = await req.json()

    // console.log("PARANS")
    // console.log(params)

    try {

      const user = await prisma.user.findUnique({
        where: {
          email: params.purchaseObj.email
        }
      })

      // const orders = await prisma.oneTimePurchases.findFirst({
      //   where: {
      //     userId: user?.id!,
      //     productType: 'animateDiff'
      //   }
      // })

      // if (orders) {
      //   return new NextResponse("Already purchased", { status: 400 });
      // }

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: params.purchaseObj.price_id,
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.NEXTAUTH_URL}/text-to-video?success=true`,  
        cancel_url: `${process.env.NEXTAUTH_URL}/text-to-video?cancelled=true`,
        customer_email: params.purchaseObj.email,
        // automatic_tax: {enabled: true},
        metadata:{
          productType: params.purchaseObj.product,
          credit: params.purchaseObj.credit
        }
      });

    // console.log('SESSION')
    // console.log(session)

    return new NextResponse(JSON.stringify({ url: session.url }))
    } catch (error: any) {
      console.log('[STRIPE ERROR]', error)
      return new NextResponse('Internal stripe error', {status: 500})
    }
}