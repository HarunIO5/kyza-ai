import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="w-full flex justify-center md:px-8 border-t border-zinc-800 bg-black z-10">
      <div className="basis-4/5 flex flex-col md:flex-row gap-8 py-10 justify-between">
        <div className="flex flex-col items-start justify-center gap-4">
        <Link className="flex justify-start items-center gap-1" href="/">
			    <p className="font-bold text-inherit">KYZA</p>
		    </Link>
      
        <Link
            target="_blank"
			      className="flex items-center gap-1 text-current"
		  	    href="https://www.diffused.agency/"
			      title="Diffused homepage"
		    >
			<span className="text-default-600">Powered by</span>
			<p className="text-primary">Diffused</p>
	    </Link>
        </div>
        <nav className="grid grid-cols-2 md:grid-cols-3 items-start gap-6 text-sm">
        <nav className="grid grid-col-1 tems-start gap-6 text-sm">
        <Link
            href="/blog"
            className="transition-colors hover:text-foreground/80 text-lg"
          >
            Blogs
          </Link>
        </nav>
          <Link
            href="/free-interior-a-i-alternative"
            className="transition-colors hover:text-foreground/80 text-lg"
          >
            Free Interior A.I Alternative
          </Link>
          <Link
            href="/free-viggle-a-i-alternative"
            className="transition-colors hover:text-foreground/80 text-lg"
          >
            Free Viggle A.I Alternative
          </Link>
          <Link
            href="/free-haiper-a-i-alternative"
            className="transition-colors hover:text-foreground/80 text-lg"
          >
            Free Haiper A.I Alternative
          </Link>
          <Link
            href="/free-fliki-a-i-alternative"
            className="transition-colors hover:text-foreground/80 text-lg"
          >
            Free Fliki A.I Alternative
          </Link>
          <Link
            href="/free-deepbrain-a-i-alternative"
            className="transition-colors hover:text-foreground/80 text-lg"
          >
            Free DeepBrain A.I Alternative
          </Link>
          <Link
            href="/free-runway-a-i-alternative"
            className="transition-colors hover:text-foreground/80 text-lg"
          >
            Free Runway A.I Alternative
          </Link>
          <Link
            href="/free-sora-a-i-alternative"
            className="transition-colors hover:text-foreground/80 text-lg"
          >
            Free Sora A.I Alternative
          </Link>
          <Link
            href="/free-hotpot-a-i-alternative"
            className="transition-colors hover:text-foreground/80 text-lg"
          >
            Free Hotpot A.I Alternative
          </Link>
          <Link
            href="/free-photo-ai-alternative"
            className="transition-colors hover:text-foreground/80 text-lg"
          >
            Free Photo AI Alternative
          </Link>
          <Link
            href="/free-runwayml-a-i-alternative"
            className="transition-colors hover:text-foreground/80 text-lg"
          >
            Free RunwayML A.I Alternative
          </Link>
          <Link
            href="/free-invideo-a-i-alternative"
            className="transition-colors hover:text-foreground/80 text-lg"
          >
            Free Invideo A.I Alternative
          </Link>
          <Link
            href="/free-headshotpro-ai-alternative"
            className="transition-colors hover:text-foreground/80 text-lg"
          >
            Free HeadshotPro AI Alternative
          </Link>
          <Link
            href="/free-midjourney-a-i-alternative"
            className="transition-colors hover:text-foreground/80 text-lg"
          >
            Free Midjourney A.I Alternative
          </Link>
          <Link
            href="/free-krea-a-i-alternative"
            className="transition-colors hover:text-foreground/80 text-lg"
          >
            Free Krea A.I Alternative
          </Link>
        </nav>
      </div>
    </footer>
  )
}