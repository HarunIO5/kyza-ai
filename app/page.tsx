import { utapi } from "@/server/uploadthing";
import VidCard from "@/components/image-cards";
import { Suspense } from "react";
import LandingPageHeading from "@/components/landing-page-heading";
import {GetVideoFiles} from "@/lib/getVidFiles";
import { fetchVideos } from "./_action";

export default async function Home() {

	const finalFiles = await fetchVideos({limit: 20, offset: 0})

	return (
		<section className="w-full flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<LandingPageHeading />
			<Suspense fallback={<div>Loading...</div>}>
				<div className="w-full p-4">
					<VidCard vidProp={finalFiles} limit={20} offset={0} />
				</div>
			</Suspense>
		</section>
	);
}
