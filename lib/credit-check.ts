import prisma from "@/lib/prisma";
// import { getUser } from "@/lib/userFunctions";

// const getUserCredits = async ({email, productType}: {email: string, productType: string}) => {

//     const user = await prisma.user.findUnique(
//       {
//         where: {
//           email: email
//         },
//         include: {
//           Credits: true
//         }
//       }
//     )

//     // console.log("USER")
//     // console.log(user)

//     const credits = user?.Credits.find((credit) => credit.productType === productType)

//     // console.log("CREDITS")
//     // console.log(credits)

//     return credits
// }

// export const decrementalCreditLimit = async ({email, productType}: {email: string, productType: string}) => {

//     // const user = await getUser(email)

//     const credits = await getUserCredits({email: email, productType: productType})

//     if (credits?.credits != 0) {

//         // await prisma.user.update({
//         //   where: {
//         //     email: email
//         //   },
//         //   data: {
//         //     freeCredits: user?.freeCredits!-1
//         //   }
//         // })

//         await prisma.credits.update({
//           where: {
//             id: credits?.id
//           },
//           data: {
//             credits: credits?.credits!-1
//           }
//         })

//        }
// }

// export const checkCreditLimit = async ({email, productType}: {email: string, productType: string}) => {

//     // const user = await getUser(email)

//     const credits = await getUserCredits({email: email, productType: productType})

//     if (credits?.credits! > 0) {
//         return false
//     } else if (credits?.credits == 0) {
//         return true
//     } else {
//         return true
//     }

// }

// export const getTotalCreditCount = async ({email, productType}: {email: string, productType: string}) => {

//     // const user = await getUser(email)

//     const credits = await getUserCredits({email: email, productType: productType})

//     const totalCredits = credits?.credits!

//     return totalCredits
// }

// getFreeCreditsCount - for a different purchase modal

// getNormalCreditsCount - for standard purchase modal
