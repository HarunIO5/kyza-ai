import { Button } from "@nextui-org/button"
import { Card, CardBody } from "@nextui-org/react"
import { DownloadIcon } from "lucide-react"
import Link from "next/link"
import PromptSectionComponent from "@/components/prompt-section"
import { getMediaModal } from "@/app/_action"

export default async function StandardMediaView ({
    params: { id }
  }: {
    params: { id: string }
  }) {

    const media = await getMediaModal({id: id!})

    return (
        <div className="w-full flex items-center justify-center py-8 px-4">
            <div className="flex flex-col-reverse md:flex-row items-start justify-between gap-4">
              <div className="flex flex-col gap-4">
                <p className="font-semibold text-xl">
                      Prompt:
                </p>
                <Card className="bg-slate-900 p-2 rounded-md w-full md:max-w-[300px]">
                  <CardBody>
                      {media.prompt}
                      <PromptSectionComponent srcName={media.prompt}/>
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
                    <video autoPlay loop className="h-[450px] md:h-[600px] w-[600px] object-cover rounded-md" playsInline={true} muted preload="metadata">
                      <source src={media.url} type="video/mp4" />
                      <track
                        src={media.url + '#t=0.1'}
                      />
                      Your browser does not support the video tag.
                    </video>
                    <div className="w-full flex items-center justify-center">
                    <Link href={`${media.url}`} target="_blank" className="w-fit">
                        <Button className="w-fit bg-slate-950">
                            <DownloadIcon />
                            Download
                        </Button>
                    </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}