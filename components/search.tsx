'use client'

import { useState, useEffect, ChangeEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import 	{
    SearchIcon,
} from "@/components/icons";
import { Kbd } from "@nextui-org/kbd";
import { Input } from "@nextui-org/input";


export default function SearchBar () {

    const initialRender = useRef(true)

    const router = useRouter()
    const [query, setQuery] = useState<string>('')

    //Handling the input on our search bar
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    // useEffect(() => {
    //     if (initialRender.current) {
    //         initialRender.current = false
    //         return
    //       }

    //     if (!search) {
    //         router.push('/videos')
    //     } else {
    //         router.push(`/videos?search=${search}`)
    //     }
    // }, [search])

    const onKeyPressHandler = (event: {key: any}) => {
        if (event.key === 'Enter' && query.length == 0) {
            router.push('/videos')
        } else if (event.key === 'Enter' && query.length >=1) {
            console.log('Check') 
            router.push(`/videos?search=${query}`)
        }


    }

    return (
        <div className="w-full flex gap-3 p-8 justify-center">
		    <Input
		    	aria-label="Search"
                onChange={handleChange}
		    	classNames={{
		    	    inputWrapper: [
                        "bg-default-100",
                        "border-violet-500",
                    ],
		      	    input: "text-sm",
		      	}}
                className="md:w-1/2 border-violet-500"
		      	endContent={
		      		<Kbd className="hidden lg:inline-block" keys={["command"]}>
		      			K
		      		</Kbd>
		      	}
		      	labelPlacement="outside"
		      	placeholder="Search..."
		      	startContent={
		      		<SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
		      	}
		      	type="text"
                variant="bordered"
                value={query}
                onKeyDown={onKeyPressHandler}
		      />
		  </div>
    );
}