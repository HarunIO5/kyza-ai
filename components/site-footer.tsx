import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="w-full flex justify-center py-6 md:px-8 md:py-0 border-t border-zinc-800">
      <div className="basis-4/5 flex gap-4 py-10 justify-between">
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
        <nav className="grid grid-cols-2 items-start gap-6 text-sm">
          <Link
            href="/blog"
            className="transition-colors hover:text-foreground/80 text-lg"
          >
            Blogs
          </Link>
        </nav>
      </div>
    </footer>
  )
}