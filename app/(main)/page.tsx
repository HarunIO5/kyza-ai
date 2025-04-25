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
import ScrollingTestimonials from "@/components/testimonals";
import prisma from "@/lib/prisma";

export default function Home() {
	return (
		<section className="min-h-screen bg-black">
			<LandingPageHeading />
			<div className="w-full py-12 px-4">
				<LandingPageVideos />
			</div>
			<div className="w-full py-12">
				<ScrollingTestimonials />
			</div>
			<div className="w-full py-12 px-12">
				<FAQSection 
					faqTitle1='How does Kyza.ai differentiate itself from other Text-to-Video Platforms?' 
					faqTitle2='Can Kyza.ai accommodate specific industry requirements or niche content?'
					faqTitle3='What level of control do users have over the visual and auditory elements?'
					faqTitle4='How does Kyza.ai ensure the quality and accuracy of the generated videos?'
					faqTitle5="What is kyza.ai's refund policy in case users encounter issues?"
					faqDescription1='Kyza.ai stands out through its advanced natural language processing algorithms, which enable it to generate highly accurate and contextually relevant video content.'
					faqDescription2='Absolutely. Kyza.ai is designed to be versatile, allowing users to input various types of content.'
					faqDescription3='Kyza.ai provides users with extensive customization options. Users can upload custom images, logos, and voiceovers to personalise their videos.'
					faqDescription4='Our platform undergoes rigorous testing and refinement processes to optimise language processing capabilities, ensuring that the generated videos are grammatically correct, coherent, and contextually relevant.'
					faqDescription5='Kyza.ai offers a satisfaction guarantee to its users. If for any reason you are not satisfied with our service, please contact our customer support team within 7 days of your purchase, and we will work with you to address your concerns.' 
				/>
			</div>
		</section>
	);
}
