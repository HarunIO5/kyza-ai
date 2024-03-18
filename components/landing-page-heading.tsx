import { title, subtitle } from "@/components/primitives";

export default function LandingPageHeading () {
    return (
        <>
            <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[100%] translate-y-[20%] rounded-full bg-[rgba(192,91,223,0.5)] opacity-50 blur-[90px]"></div>
      		<div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[60%] translate-y-[20%] rounded-full bg-[rgba(124,84,255,0.5)] opacity-50 blur-[90px]"></div>
      		<div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[60%] translate-y-[40%] rounded-full bg-[rgba(53,231,255,0.5)] opacity-50 blur-[90px]"></div>
			<div className="px-4 inline-block max-w-xl text-center justify-center">
				<h1 className={title()}>Search For&nbsp;</h1>
				<h1 className={title({ color: "violet" })}>Beautiful&nbsp;</h1>
				<br />
				<h1 className={title()}>
					AI Videos
				</h1>
				<h2 className={subtitle({ class: "mt-4" })}>
					Search and view the latest videos from Haiper.ai
				</h2>
	    	</div>
        </>     
    );
}