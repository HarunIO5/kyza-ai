import * as z from "zod"

export const registerFormSchema = z.object({
    username: z.string().min(3, 
      "Username is required, minimum of 3 characters"
      ).max(25,
      "Username can't be longer than 25 characters"
      ),
    email: z.string().min(1, {message: "Email is required"}).email({
      message: "Must be a valid email"
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters"
    }),
    confirmPassword: z.string().min(1, {
      message: "Confirm password is required"
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  })
  
  export const loginFormSchema = z.object({
    email: z.string().min(1, {message: "Email is required"}).email({
      message: "Must be a valid email"
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters"
    })
  })
  
  export const resetPasswordFormSchema = z.object({
    password: z.string().min(8, {
      message: "Password must be at least 8 characters"
    }),
    confirmPassword: z.string().min(1, {
      message: "Confirm password is required"
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  })
  
  export const emailFormSchema = z.object({
    subject: z.string().min(10, {
        message: "Subject must be a minimum 10 characters"
    }).optional(),
    body: z.string().min(30, {
        message: "Emal body must be at least 30 characters"
    }).optional()
  })

  export const textToVideoSchema = z.object({
    prompt: z.string().min(3, {
      message: "Prompt must be a minimum of 3 characters"
    }),
    negative_prompt: z.string().min(3, {
      message: "Negative prompt must be a minimum of 3 characters"
    }).optional().or(z.literal(''))
  })

export type loginFormSchema = z.infer<typeof loginFormSchema>
export type registerFormSchema = z.infer<typeof registerFormSchema>
export type resetPasswordFormSchema = z.infer<typeof resetPasswordFormSchema>
export type EmailParams = z.infer<typeof emailFormSchema>
export type textToVideoSchema = z.infer<typeof textToVideoSchema>
