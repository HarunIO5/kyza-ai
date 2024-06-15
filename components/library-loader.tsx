import { SearchVideoLength, SearchVideosDB } from "@/lib/getVidFiles";
import VidCard from "@/components/image-cards";

export default async function LibraryLoader ({
    search
}: {
    search: string
}) {

    const initialVideos = await SearchVideosDB({ search: search!, skip: 0 });
    const videoLength = await SearchVideoLength({ search: search! });

    return (
        <VidCard
          vidProp={initialVideos}
          search={search!}
          videoLength={videoLength as number}
        />
    );
}