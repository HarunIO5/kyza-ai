'use client'

import { vidType } from "@/app/layout";
import {Card, CardFooter, CardBody, Image, Button, spinner} from "@nextui-org/react";
import {
	TwitterIcon,
	GithubIcon,
	DiscordIcon,
	HeartFilledIcon,
	SearchIcon,
} from "@/components/icons";
import {
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  useDisclosure
} from "@nextui-org/react";
import { Kbd } from "@nextui-org/kbd";
import { Input } from "@nextui-org/input";
import { useEffect, useState } from "react";
import {Spinner} from "@nextui-org/react";
import { Suspense } from "react";
import { divider } from "@nextui-org/theme";
import ImageModal from "./image-modal";
import { useInView } from "react-intersection-observer";
import { fetchVideos } from "@/app/_action";


export default function VidCard ({vidProp, limit, offset} : {vidProp : vidType[], limit: number, offset: number}) {

    const [query, setQuery] = useState<string>('')
    const [srcName, setSrcName] = useState<string>('')
    const [srcUrl, setSrcUrl] = useState<string>('')
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [videos, setVideos] = useState(vidProp)
    const [videoLimit, setVideoLimit] = useState(limit)
    const [videoOffset, setVideoOffset] = useState(offset)
    const [ref, inView] = useInView()

    // console.log("CLIENT SIDE")
    // console.log(vidProp)

    async function loadMoreVideos() {
      const next = videoLimit + 20
      const skip = videoOffset + 20
      const videos = await fetchVideos({ limit: next, offset: skip })
      if (videos?.length) {
        setVideoLimit(next)
        setVideoOffset(skip)
        setVideos((prev: vidType[] | undefined) => [
          ...(prev?.length ? prev : []),
          ...videos
        ])
      }
    }

    // handle mouse enter
    const handleMouseEnter = (e: any) => {
      const vid = e.target
      vid.muted = true
      vid.play()
    }
    // handle mouse leave
    const handleMouseLeave = (e: any) => {
      const vid = e.target
      vid.muted = false
      vid.currentTime = 0
      vid.pause()
    }

    //Our search filter function
    const searchFilter = (array: vidType[]) => {
        return array.filter(
          (el) => el.name.toLowerCase().includes(query)
        )
    }

    //Applying our search filter function to our array of countries recieved from the API
    const filtered = searchFilter(videos)

    //Handling the input on our search bar
    const handleChange = (e?: React.BaseSyntheticEvent) => {
        setQuery(e?.target.value)
    }

    useEffect(() => {
      if (inView) {
        loadMoreVideos()
      }
    }, [inView])

    return (
        <>
            <div className="flex gap-3 py-8 justify-center">
				      <Input
				      	aria-label="Search"
                          onChange={handleChange}
				      	classNames={{
				      		inputWrapper: "bg-default-100",
				      		input: "text-sm",
				      	}}
                className="md:w-1/2"
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
				      	type="search"
				      />
			      </div>
            <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-1.5">
                {filtered && (
                    filtered.map((file: vidType) => {
                        return (
                          <>
                            <Card
                            isFooterBlurred
                            className="rounded-none opacity-75 hover:opacity-100"
                            key={file.id}
                            onPress={() => {
                              setSrcUrl(file.url)
                              setSrcName(file.name)
                              onOpen() 
                            }} 
                            isPressable={true}
                            >
                              <video height="240" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="h-[420px] w-full object-cover" playsInline>
                                <source src={file.url} type="video/mp4" />
                                <track
                                  src={file.url}
                                />
                                Your browser does not support the video tag.
                              </video>
                            <CardFooter className="justify-start before:bg-white/10 border-white/20 border-1 overflow-hidden py-2 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                              <p className="text-tiny text-white/80">{file.name.slice(0, 30)}...</p>
                            </CardFooter>
                          </Card>
                          
                          </>
                        )
                    })
                )}
            </div>
            <ImageModal onOpen={isOpen} onOpenChange={onOpenChange} srcName={srcName} srcUrl={srcUrl}/>
            {/* loading spinner */}
            <div
              ref={ref}
              className='col-span-1 mt-16 flex items-center justify-center sm:col-span-2 md:col-span-3 lg:col-span-4'
            >
              <svg
                aria-hidden='true'
                className='h-10 w-10 animate-spin fill-sky-600 text-gray-200 dark:text-gray-600'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='currentColor'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='currentFill'
                />
              </svg>
              <span className='sr-only'>Loading...</span>
            </div>
        </>  
    );
}