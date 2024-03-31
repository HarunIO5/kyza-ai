import prisma from "@/lib/prisma";
import { getUser } from "@/lib/userFunctions";

export const decrementalCreditLimit = async ({email}: {email: string}) => {

    const user = await getUser(email)

    if (user?.freeCredits != 0) {

        await prisma.user.update({
          where: {
            email: email
          },
          data: {
            freeCredits: user?.freeCredits!-1
          }
        })

       } else if (user?.freeCredits == 0 && user?.credits != 0){

        await prisma.user.update({
          where: {
            email: email
          },
          data: {
            credits: user?.credits!-1
          }
        })

    } 
}

export const checkCreditLimit = async ({email}: {email: string}) => {

    const user = await getUser(email)

    if (user?.freeCredits! > 0 || user?.credits! > 0) {
        return false
    } else if (user?.freeCredits == 0 && user?.credits == 0) {
        return true
    } else {
        return true
    }

}

export const getTotalCreditCount = async ({email}: {email: string}) => {

    const user = await getUser(email)

    const totalCredits = user?.freeCredits! + user?.credits!

    return totalCredits
}

// getFreeCreditsCount - for a different purchase modal

// getNormalCreditsCount - for standard purchase modal