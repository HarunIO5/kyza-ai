import { Button } from "@nextui-org/button"
import { Card, CardBody } from "@nextui-org/react"
import { DownloadIcon } from "lucide-react"
import Link from "next/link"
import PromptSectionComponent from "@/components/prompt-section"
import { getLatestMediaPosts, getMediaModal } from "@/app/_action"
import { MediaType } from "@/lib/getVidFiles"
import { Metadata } from "next"
import { cache } from "react"
import DownloadBtn from "@/components/download-btn"
import Image from "next/image"


export async function generateStaticParams() {

  // const posts = (await getLatestPost()) as Post[];

  const media  = (await getLatestMediaPosts()) as MediaType[]

  return media.map((med) => med.key)
  
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {

  // const media = await getMediaModal({id: params.slug!}) as MediaType

  const media = await getMedia({params: {id: params.id!}})

  return {
    title: media.prompt,
    description: media.prompt,
  }
}


const getMedia  = cache(async ({
  params: { id }
}: {
  params: { id: string }
}) => {

  return await getMediaModal({id: id!}) as MediaType
})

export default async function StandardMediaView ({
    params: { id }
  }: {
    params: { id: string }
  }) {

  const media = await getMediaModal({id: id!}) as MediaType

  


    return (
        <div className="w-full flex items-center justify-center py-8 px-4">
            <div className="flex flex-col-reverse md:flex-row items-start justify-between gap-4">
              <div className="flex flex-col gap-4">
                <p className="font-semibold text-xl">
                      Prompt:
                </p>
                <Card className="dark:bg-slate-900 p-2 rounded-md w-full md:max-w-[300px]">
                  <CardBody>
                      {media.prompt}
                      <PromptSectionComponent srcName={media.prompt!}/>
                  </CardBody>
                </Card>
                <h3 className="text-md font-medium text-zinc-400">
                  Model:
                </h3>
                <p className="text-md font-semibold">
                  {media.model || 'Haiper'}
                </p>
              </div>
                <div className="flex flex-col gap-2">
                    {media.type === 'SHORTVIDEO' && (
                      <video autoPlay loop className="h-[450px] md:h-[600px] w-[600px] object-cover rounded-md" playsInline={true} muted preload="metadata">
                      <source src={media.url!} type="video/mp4" />
                      <track
                        src={media.url! + '#t=0.1'}
                      />
                      Your browser does not support the video tag.
                    </video>
                    )}
                    {media.type === 'IMAGE' && (
                      <Image 
                        src={media.url!} 
                        alt={media.prompt!} 
                        className="h-full w-full object-cover" 
                        width={500} 
                        height={500}
                      />
                    )}
                    <div className="w-full flex items-center justify-center">
                        <DownloadBtn srcName={media.prompt!} srcUrl={media.url!} etx={media.type! === 'SHORTVIDEO' ? 'mp4' : 'webp'}/>
                    </div>
                </div>
            </div>
        </div>
    )
}