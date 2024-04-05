import { utapi } from "@/lib/uploadthing";
import VidCard from "@/components/image-cards";
import { Suspense } from "react";
import LandingPageHeading from "@/components/landing-page-heading";
import { fetchVideos } from "../_action";
import { isMobileDevice } from "@/server/mobile-checker";
import LandingPageVideos from "@/components/landingVideos";
import SearchBar from "@/components/search";
import FAQSection from "@/components/faqsection";
import { BbblurryIcon } from "@/components/icons";
import { SaveSearchableVideos } from "@/lib/uploadVideos";

export default async function Home() {

	// #######################################################################
	// #################### UPLOAD FILES FROM UT TO DB #######################
	// #######################################################################

	// const fileList = await fetch('https://uploadthing.com/api/listFiles', {
	// method: 'POST',
	// headers: {
	//   'Content-Type': 'application/json',
	//   'X-Uploadthing-Api-Key': process.env.UPLOADTHING_SECRET!,
	//   'X-Uploadthing-Version': '6.4.0'
	// },
	// body: JSON.stringify({
	//   limit: 0,
	//   offset: 0
	// })
	// })

	// // console.log('LIST FILE')

	// const viewFiles = await fileList.json()
	// console.log("VIEW FILES")
	// console.log(viewFiles.files.length)

	// let i = 0;

	// do {
	//   if (viewFiles.files[i].name.toLowerCase().indexOf("null") === -1 ){
	// 	  const videos = await SaveSearchableVideos({key: viewFiles.files[i].key, prompt: viewFiles.files[i].name, url: `https://utfs.io/f/${viewFiles.files[i].key}`, model: "Haiper"})
	// 	  console.log(`DB Video Upload ${i}`)
	// 	  console.log(videos)
	//   }
	//   i++;
	// } while (i < viewFiles.files.length);

	return (
		<section className="w-full flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<LandingPageHeading />
			<SearchBar />
			<div className="w-full py-12 px-4">
				<LandingPageVideos/>
			</div>
			<div className="w-full py-12 px-12">
			<FAQSection />
			</div>
		</section>
	);
}
