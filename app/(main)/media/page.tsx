import VidCard from "@/components/image-cards";
import LandingPageHeading from "@/components/landing-page-heading";
import { fetchSearchedVideos } from "../../_action";
import { SearchVideosDB, SearchVideoLength } from "@/lib/getVidFiles";
import SearchBar from "@/components/search";
import { revalidatePath } from "next/cache";
import { Suspense } from "react";
import SearchFailed from "@/components/search-failed";
import { Spinner } from "@nextui-org/react";
import LoadingSearchResults from "@/components/loading-search";
import LibraryLoader from "@/components/library-loader";
import { subtitle, title } from "@/components/primitives";

export type SearchVideosType = {
  id: string;
  key: string | null;
  prompt: string;
  url: string;
  fileSizeBytes: number | null;
  type: string;
  model: string;
  style?: string;
  scale?: number;
  status?: string;
  ratio?: string;
  format?: string;
};

// export const dynamic = 'force-dynamic'

export default async function VideosFeed({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;
  // console.log("params")
  // console.log(JSON.stringify(search))

  // const initialVideos = await SearchVideosDB({ search: search!, skip: 0 });
  // const videoLength = await SearchVideoLength({ search: search! });

  // console.log('SEARCH RESULTS')
  // console.log(initialVideos)
  // console.log(videoLength)

  // revalidatePath('/videos', 'page')
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      <div className="relative px-5 max-w-3xl mx-auto text-center">
        <h1 className={title()}>Kyza&nbsp;</h1>
        <h1
          className={`${title()} inline-flex animate-text-gradient bg-gradient-to-r from-[#ac4cf5] via-[#53d1ff] to-[#dd61ff] bg-[200%_auto] bg-clip-text italic text-transparent`}
        >
          Lab&nbsp;
        </h1>
        <h2 className={subtitle({ class: "mt-4 mb-8" })}>
          Search and view the latest videos from the latest models
        </h2>
      </div>
      <div className="w-1/2 flex justify-center items-center mb-16">
        <SearchBar />
      </div>
      <Suspense
        key={JSON.stringify(search)}
        fallback={<LoadingSearchResults />}
      >
        <LibraryLoader search={search!} />
      </Suspense>
    </div>
  );
}
