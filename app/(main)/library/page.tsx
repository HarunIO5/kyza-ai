import {Link} from "@nextui-org/react";
import { getSavedVideosProps, getSavedVideosLength } from "@/app/_action";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LibraryCards from "@/components/library-cards";
import Image from "next/image";

export type SavedVideoType = {
  id: string;
  productType: string;
  model: string | null;
  prompt: string;
  style: string | null;
  negativePrompt: string | null;
  scale: string | null;
  createdAt: any;
  url: string | null;
  userId: string;
} 

export default async function LibraryPage () {

  const session = await getServerSession(authOptions)

  const { email, name } = session?.user || {};

  const videos: SavedVideoType[] = await getSavedVideosProps({email: email!, skip: 0})

  const videoLength = await getSavedVideosLength({email: email!})

    return (
        <div>
            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
              <div className="mx-auto grid w-full max-w-6xl gap-2">
                <h1 className="max-md:p-4 text-3xl font-semibold">Library</h1>
              </div>
              <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                <nav className="grid gap-4 text-sm text-muted-foreground max-md:hidden">
                    <Link href="/library" className="font-semibold text-secondary">
                        Library
                    </Link>
                    <Link href="#" color="foreground">
                        Setting
                    </Link>
                </nav>
                {videoLength !=0 ? (
                  <LibraryCards email={email!} videoProp={videos} videoLength={videoLength}/>
                ) : (
                  <div className="min-h-full flex flex-col justify-center items-center z-10">
                      <h1 className="text-4xl text-center z-10 font-bold">No Videos Generated Yet</h1>
                      <Image src={'/novideosavedgif.gif'} alt="No Videos Saved" width={350} height={350} className="py-4"/>
                      <Link href={'/text-to-video'} underline="hover" color="foreground" showAnchorIcon>
                        <h3>Generated a video, give it a try</h3>
                      </Link>
                  </div>
                )}
              </div>
            </main>
        </div>
    )
}