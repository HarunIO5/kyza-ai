import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="w-full flex justify-center md:px-8 border-t border-zinc-800 bg-white dark:bg-black z-10">
      <div className="w-full max-md:px-4 md:basis-4/5 flex gap-8 py-10 justify-between">
        <div className="flex flex-col items-start md:justify-center gap-4">
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
		<div className="flex flex-col md:flex-row gap-2 md:gap-4">
        <nav className="flex flex-col items-start gap-2 text-sm">
          <Link
            href="/blog"
            className="transition-colors hover:text-foreground/80 text-lg"
          >
            Blogs
          </Link>
          <Link
            href="/alternatives"
            className="transition-colors hover:text-foreground/80 text-lg"
          >
            Alternatives
          </Link>
          
        </nav>
		<nav className="grid grid-cols-1 md:grid-cols-2 items-start gap-2 text-sm">
		<Link
							href={'/tools/text-to-video'}
							className="transition-colors hover:text-foreground/80 text-lg"
						>
							Text-to-Video
					</Link>
          <Link
							href={'/tools/wallpaper-engine'}
							className="transition-colors hover:text-foreground/80 text-lg"
						>
							Wallpaper Engine
					</Link>
          <Link
							href={'/tools/brand-logo-generator'}
							className="transition-colors hover:text-foreground/80 text-lg"
						>
							AI Logo Generator
					</Link>
          <Link
							href={'/tools/prompt-detector-discover-any-prompt'}
							className="transition-colors hover:text-foreground/80 text-lg"
						>
							Prompt Detector
					</Link>
          <Link
							href={'/tools/a-i-movie-generator'}
							className="transition-colors hover:text-foreground/80 text-lg"
						>
							AI Movie Generator
					</Link>
          <Link
							href={'/tools/video-caption-online'}
							className="transition-colors hover:text-foreground/80 text-lg"
						>
							Auto Captioning
					</Link>
          <Link
							href={'/tools/generative-art-maker'}
							className="transition-colors hover:text-foreground/80 text-lg"
						>
							Generative Art
					</Link>
          <Link
				href={'/tools/kyza-interior-ai'}
				className="transition-colors hover:text-foreground/80 text-lg"
			>
				AI Interior Designer
			</Link>
			<Link
				href={'/tools/qr-code-art-generator '}
				className="transition-colors hover:text-foreground/80 text-lg"
			>
				QR Code Art Maker
			</Link>
			<Link
				href={'/tools/ai-imagine-enhancer'}
				className="transition-colors hover:text-foreground/80 text-lg"
			>
				AI Image Enhancer
			</Link>
			<Link
				href={'/tools/ai-cricut-designer'}
				className="transition-colors hover:text-foreground/80 text-lg"
			>
				AI Cricut Designer
			</Link>
		</nav>
		</div>
      </div>
    </footer>
  )
}