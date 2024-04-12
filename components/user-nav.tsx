'use client'

import React, { useState } from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, DropdownSection} from "@nextui-org/react";
import { signOut } from "next-auth/react"
import { Session } from "next-auth";
import { Sparkles } from 'lucide-react';
import Link from "next/link";

// USE checkCreditLimit to have a CTA to purchase via the UserNav

export default function UserNav({session}: {session: Session}) {

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
        <DropdownMenu aria-label="Profile Actions" variant="flat" disabledKeys={["profile"]}>
            <DropdownSection showDivider>
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{email!}</p>
                </DropdownItem>
            </DropdownSection>
            <DropdownItem key="library" href={'/library'} className="">
                Library
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={() => signOut({callbackUrl: `${baseUrl}`})}>
              <p className="text-red-500">
                Log Out
              </p>
            </DropdownItem>
        </DropdownMenu>
      </Dropdown>
  );
}
