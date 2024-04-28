import ImageModal from "@/components/image-modal"
import { useDisclosure } from "@nextui-org/react";
import { getMediaModal } from "@/app/_action";

export default async function MediaModal({
    params: { id }
  }: {
    params: { id: string }
  }) {

    // const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const media = await getMediaModal({id: id!})

    // console.log('URL DATA')
    // console.log(media)

    return (
        <>
            <ImageModal srcName={media.prompt} srcUrl={media.url}/>
        </>
    )
  }