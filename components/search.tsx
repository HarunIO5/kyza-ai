'use client'

import { useState, useEffect, ChangeEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import 	{
    SearchIcon,
} from "@/components/icons";
import { Kbd } from "@nextui-org/kbd";
import { Input } from "@nextui-org/input";
import LandingPageVideoFilters from "./video-filters";


export default function SearchBar () {

    const initialRender = useRef(true)

    const router = useRouter()
    const [query, setQuery] = useState<string>('')
    const [isMounted, setIsMounted] = useState(false);

    //Handling the input on our search bar
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    useEffect(() => {
        setIsMounted(true);
    }, []);
    
    if (!isMounted) {
       return null;
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
            router.push('/media')
        } else if (event.key === 'Enter' && query.length >=1) {
            console.log('Check') 
            router.push(`/media?search=${query}`)
        }


    }

    return (
        <div className="w-full flex flex-col gap-3 p-6 justify-center items-center">
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
		      	placeholder="Search &ldquo;Cars&ldquo;"
		      	startContent={
		      		<SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
		      	}
		      	type="text"
                variant="bordered"
                value={query}
                onKeyDown={onKeyPressHandler}
		      />
              <LandingPageVideoFilters/>
		  </div>
    );
}