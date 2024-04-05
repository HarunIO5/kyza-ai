import VidCard from "@/components/image-cards";
import LandingPageHeading from "@/components/landing-page-heading";
import { fetchSearchedVideos } from "../../_action";
import { SearchVideosDB, SearchVideoLength } from "@/lib/getVidFiles";
import SearchBar from "@/components/search";
import { revalidatePath } from 'next/cache'
import { Suspense } from "react";
import SearchFailed from "@/components/search-failed";

export type SearchVideosType = {
    id: string;
    key: string | null;
    prompt: string;
    url: string;
    fileSizeBytes: number | null;
}

// export const dynamic = 'force-dynamic'

export default async function VideosFeed ({
    searchParams
}: {
    searchParams : { [key: string]: string | string[] | undefined }
}) {

    const search = typeof searchParams.search === 'string' ? searchParams.search : undefined
    // console.log("params")
    // console.log(search)

    const initialVideos = await SearchVideosDB({search: search!, skip: 0})
    const videoLength = await SearchVideoLength({search: search!})

    // console.log('SEARCH RESULTS')
    // console.log(initialVideos)
    // console.log(videoLength)

    // revalidatePath('/videos', 'page')
    return (
        <div className="w-full flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <LandingPageHeading />
            <Suspense>
                <SearchBar />
            </Suspense>
            {videoLength !=0 ? (
                <Suspense key={`search=${searchParams?.search}`} fallback={<div>Loading...</div>}>
                    <VidCard vidProp={initialVideos} search={search!} videoLength={videoLength as number}/>
                </Suspense>
            ) : (
                <SearchFailed />
            )}
            
        </div>
    );
}