// import bcrypt from 'bcrypt'
// import { PrismaClient } from '@prisma/client'
// import { NextRequest, NextResponse } from 'next/server'
// import { sendEmail } from '@/lib/email/mailer';
// import { registerFormSchema } from '@/lib/validations/kyzaValidations';

// const prisma = new PrismaClient();

// export async function POST(req: NextRequest) {
//     const body = await req.json()
//     const { username, email, password } = body.values as registerFormSchema;

//     // console.log(firstName)
//     // console.log(lastName)

//     if(!username || !email || !password) {
//         return new NextResponse("Missing username, email or password", {status: 400});
//     }

//     const emailExist = await prisma.user.findUnique({
//         where: {
//             email: email.toLowerCase()
//         }
//     })

//     const usernameExist = await prisma.user.findUnique({
//         where: {
//             name: username.toLowerCase()
//         }
//     })

//     if (emailExist || usernameExist) {
//         return NextResponse.json({error: "Email or Username already exists"}, {status: 400});
//     }

//     const saltRds = 10

//     const hashedPassword = await bcrypt.hash(password, saltRds)

//     const user = await prisma.user.create({
//         data: {
//             name: username,
//             email: email.toLowerCase(),
//             hashedPassword: hashedPassword,
//         }
//     })

//     const TextToVideoCredit = await prisma.credits.create({
//         data: {
//             productType: 'TextToVideo',
//             userId: user.id,
//             creditType: 'FREE',
//             credits: 3
//         }
//     })

//     const TextToImageCredit = await prisma.credits.create({
//         data: {
//             productType: 'TextToImage',
//             userId: user.id,
//             creditType: 'FREE',
//             credits: 3
//         }
//     })

//     const sendMail = await sendEmail(email.toLowerCase(), "VERIFY", user.id)

//     console.log("Send Mail - Register: ", sendMail)

//     return NextResponse.json(user)
// }
