// 'use client'

// import { Modal, ModalBody, ModalHeader, ModalContent, ModalFooter, useDisclosure } from "@nextui-org/react"
// import { Input } from "@nextui-org/input"
// import { Button } from "@nextui-org/button"
// import { useState } from "react"
// import { Loader2 } from "lucide-react"
// import React from 'react';
// import { SyntheticEvent } from "react"
// import { getUserInfo, sendTokenEmail } from "@/app/_action"

// export function RequestEmailVerification() {

//     const [isLoading, setIsLoading] = useState<boolean>(false)
//     const [emailSent, setEmailSent] = useState<boolean>(false)
//     const [emailSentError, setEmailSentError] = useState<boolean>(false)

//     const {isOpen, onOpen, onOpenChange} = useDisclosure();

//     const onSubmit = async (e: SyntheticEvent) => {
//       setIsLoading(true)
//       e.preventDefault()

//       const eTarget = e.target as any
//       const email:string = eTarget[0].value
//       // console.log(email)

//       const userInfo = await getUserInfo(email)

//       // console.log(userInfo)

//       try {

//         if (userInfo) {
//           const mail = await sendTokenEmail(email, "VERIFY", userInfo.id)
//           // console.log(mail)
//           setEmailSent(true)
//         }

//         setIsLoading(false)
//       } catch (error: any) {
//         console.log(error)
//         setEmailSentError(true)
//         setIsLoading(false)
//       }
//     }

//   return (
//     <>
//         <Button variant="solid" onPress={onOpen} color="danger">Request Email Verification</Button>
//         <Modal className="max-h-full overflow-auto sm:max-w-[425px] md:max-w-[525px] lg:max-w-[700px] 2xl:max-w-[850px]" isOpen={isOpen} onOpenChange={onOpenChange}>
//         <ModalContent>
//             {(onClose) => (
//               <>
//                 <ModalHeader>Email Verification</ModalHeader>
//                 <ModalBody>
//                 {(!emailSent && !emailSentError) &&
//                   <p>Input your email, and we&apos;ll send you email, if you have an account.</p>
//                 }
//                 {(emailSent && !emailSentError) && (
//                   <p className="font-semibold text-green-500">Email Sent, please check your inbox!</p>
//                 )}
//                 {emailSentError && (
//                   <p className="font-semibold text-red-500">Failed to send email, please enter a correct email or try again later.</p>
//                 )}
//                 <form onSubmit={onSubmit}>
//                     <div className="grid gap-2">
//                         <div className="grid gap-1 py-4">
//                             <Input
//                                 id="email"
//                                 placeholder="name@example.com"
//                                 label="Email"
//                                 labelPlacement="outside"
//                                 type="email"
//                                 autoCapitalize="none"
//                                 autoComplete="email"
//                                 autoCorrect="off"
//                                 disabled={isLoading}
//                                 required
//                             />
//                         </div>
//                         <ModalFooter>
//                             {(emailSent && !emailSentError) ? (
//                                 <Button color="danger" variant="light" onPress={onClose}>
//                                     Close
//                                 </Button>
//                             ) : (
//                                 <Button disabled={isLoading}>
//                                   {isLoading && (
//                                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                                   )}
//                                       Verify Email
//                                 </Button>
//                             )}
//                         </ModalFooter>
//                     </div>
//                 </form>
//             </ModalBody>
//           </>
//             )}
//           </ModalContent>
//         </Modal>
//     </>
//   )
// }
