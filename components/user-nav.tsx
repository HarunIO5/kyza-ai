'use client'

import React, { useState } from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, DropdownSection} from "@nextui-org/react";
import { signOut } from "next-auth/react"
import { Session } from "next-auth";
import { Sparkles } from 'lucide-react';

// USE checkCreditLimit to have a CTA to purchase via the UserNav

export default function UserNav({session, creditCount, checkCreditLimit}: {session: Session, creditCount: number, checkCreditLimit: boolean}) {

    // const [ freeCredits, setFreeCredits ] = useState<number>(3)
    // const [ credit, setCredits ] = useState<number>(0)
    // const [ totalCredits, setTotalCredits ] = useState<number>(0)

    const { email, image, name } = session?.user || {};


    // const onRefetch = async () => {
    //   const user = await getUserInfo(email!)

    //   setCredits(user?.credits!)
    //   setFreeCredits(user?.freeCredits!)
    //   setTotalCredits(freeCredits + credit)

    // }

    let baseUrl = ''

    if (process.env.NODE_ENV === 'production'){
      baseUrl = 'https://kyza.ai'
      } else {
      baseUrl = 'http://localhost:3000'
      }

  return (
      <Dropdown placement="bottom">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            showFallback
            name={name!}
            className="transition-transform"
            src={image!}
            // onClick={() => {onRefetch()}}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownSection showDivider>
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{email!}</p>
                </DropdownItem>
                <DropdownItem key="profile" className="h-14 gap-2" startContent={<Sparkles className={'h-4 w-4 fill-yellow-500 text-yellow-500'} />}>
                  <p className="font-semibold">{creditCount} credits remaining</p>
                </DropdownItem> 
            </DropdownSection>
            <DropdownItem key="logout" color="danger" onClick={() => signOut({callbackUrl: `${baseUrl}`})}>
              Log Out
            </DropdownItem>
        </DropdownMenu>
      </Dropdown>
  );
}
