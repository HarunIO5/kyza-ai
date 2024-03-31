import bcrypt from 'bcrypt'
import prisma from "@/lib/prisma"
import { Resend } from 'resend';
import ResetPasswordEmail from '@/components/email/resetpassword';
import VerifyEmail from '@/components/email/verifyemail';

export async function sendEmail (email: string, emailType: string, userId: string) {
    try {

        const resend = new Resend(process.env.RESEND_API_KEY);

        const HashToken = await bcrypt.hash(userId, 10)

        const current = new Date()
        const followingDay = new Date(current.getTime() + 86400000);

        if (emailType == "VERIFY") {
            await prisma.user.update({
                where: {
                    email: email
                },
                data: {
                    verifyToken: HashToken,
                    verifyTokenExpiry: followingDay
                }
            })
        } else if (emailType == "RESET") {
            await prisma.user.update({
                where: {
                    email: email
                },
                data: {
                    forgotPasswordToken: HashToken,
                    forgotPasswordTokenExpiry: followingDay
                }
            })
        }

        let baseURL

        if (process.env.NODE_ENV === 'production'){
        baseURL = 'https://kyza.ai'
        } else {
        baseURL = 'http://localhost:3000'
        }

        const remail = await resend.emails.send({
            from: 'no-reply@kyza.ai',
            to: email,
            subject: emailType === "RESET" ? "Reset Your Password" : "Verify Your Email",
            react: emailType === "RESET" 
            ? ResetPasswordEmail({userFirstname: email!, resetPasswordLink: `${baseURL}/resetcredentials?token=${HashToken}`})
            : VerifyEmail({userFirstname: email!, resetPasswordLink: `${baseURL}/verifyemail?token=${HashToken}`})
          });
        
        return remail

    } catch (error: any) {
        throw new Error(error.message)
    }
}
