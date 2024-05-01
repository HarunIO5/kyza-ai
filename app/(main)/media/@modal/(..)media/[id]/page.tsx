import ImageModal from "@/components/image-modal"
import { useDisclosure } from "@nextui-org/react";
import { getMediaModal, getLatestMediaPosts } from "@/app/_action";
import { Metadata } from "next";
import { MediaType } from "@/lib/getVidFiles";
import { cache } from "react";

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
    // https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image#generate-images-using-code-js-ts-tsx
  }
}


const getMedia  = cache(async ({
  params: { id }
}: {
  params: { id: string }
}) => {

  return await getMediaModal({id: id!}) as MediaType
})

export default async function MediaModal({
    params: { id }
  }: {
    params: { id: string }
  }) {

    // const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const media = await getMedia({params: {id: id!}})

    // console.log('URL DATA')
    // console.log(media)

    return (
        <>
            <ImageModal srcName={media.prompt!} srcUrl={media.url!}/>
        </>
    )
  }