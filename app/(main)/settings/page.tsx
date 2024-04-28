import {Link} from "@nextui-org/react";
import { getSavedVideosProps, getSavedVideosLength } from "@/app/_action";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LibraryCards from "@/components/library-cards";
import Image from "next/image";
import SettingsComponent from "@/components/settings-component";

export type SavedVideoType = {
  id: string;
  productType: string;
  key: string
  model: string | null;
  prompt: string;
  style: string | null;
  negativePrompt: string | null;
  scale: string | null;
  createdAt: any;
  url: string | null;
  userId: string;
  type: any;
  status: any;
} 

export default async function SettingsPage () {

  const session = await getServerSession(authOptions)

  const { email, name, image } = session?.user || {};

    return (
        <div>
            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
              <div className="mx-auto grid w-full max-w-6xl gap-2">
                <h1 className="max-md:p-4 text-3xl font-semibold">Settings</h1>
              </div>
              <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                <nav className="grid gap-4 text-sm text-muted-foreground max-md:hidden">
                    <Link href="/library" color="foreground">
                        Library
                    </Link>
                    <Link href="/settings" className="font-semibold text-secondary">
                        Setting
                    </Link>
                </nav>
                <SettingsComponent email={email!} name={name!} image={image!}/>
              </div>
            </main>
        </div>
    )
}