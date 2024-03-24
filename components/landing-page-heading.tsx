import { title, subtitle } from "@/components/primitives";
import { BbblurryIcon, WavesIcon } from "./icons";

export default function LandingPageHeading () {
    return (
        <>
			<WavesIcon className="absolute -z-1 bottom-0 left-0 right-0 top-60 md:top-12 h-120% w-full opacity-70"/>
			<div className="px-4 inline-block max-w-xl text-center justify-center">
				<h1 className={title()}>Search For&nbsp;</h1>
				<h1 className={`${title()} inline-flex animate-text-gradient bg-gradient-to-r from-[#b2a8fd] via-[#ac4cf5] to-[#c7d2fe] bg-[200%_auto] bg-clip-text text-transparent`}>Beautiful&nbsp;</h1>
				<br />
				<h1 className={title()}>
					AI Videos
				</h1>
				<h2 className={subtitle({ class: "mt-4" })}>
					Search and view the latest videos from the latest models
				</h2>
	    	</div>
        </>     
    );
}