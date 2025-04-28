import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="w-full flex justify-center md:px-8 border-t border-zinc-800 bg-white dark:bg-black z-10">
      <div className="w-full max-md:px-4 md:basis-4/5 flex gap-8 py-10 justify-between">
        <div className="flex flex-col items-start md:justify-center gap-4">
          <Link className="flex justify-start items-center gap-1" href="/">
            <p className="font-bold text-inherit">KYZA</p>
          </Link>
        </div>
      </div>
    </footer>
  );
}
