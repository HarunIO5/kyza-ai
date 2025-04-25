// import prisma from '@/lib/prisma'
// import { NextRequest, NextResponse } from 'next/server'

// export async function POST(req: NextRequest){

//     try {
//         const body = await req.json()
//         const {token} = body

//         console.log("TOKEN")
//         console.log(token);

//         const Day = Date.now() - (24 * 60 * 60 * 1000);
//         const lastDay = new Date(Day).toISOString();

//         const findUser = await prisma.user.findUnique({
//             where: {
//                 verifyToken: token,
//                 verifyTokenExpiry: {
//                     gte: lastDay
//                 }
//             }
//         })

//         if (!findUser) {
//             return NextResponse.json({error: "Invalid Token"}, {status: 400})
//         }

//         console.log("USER INSIDE VERIFY EMAIL")
//         console.log(findUser)

//         const userVerified = await prisma.user.update({
//             where: {
//                 email: findUser.email?.toLowerCase() as string
//             },
//             data: {
//                 emailVerified: new Date(),
//                 verifyToken: null,
//                 verifyTokenExpiry: null
//             }
//         })

//         console.log("USER VERIFIED")
//         console.log(userVerified)

//         return NextResponse.json({
//             message: "Email verified successfully",
//             success: true
//         })

//     } catch (error: any) {
//         return NextResponse.json({error: error.message}, {status: 500})
//     }
// }
