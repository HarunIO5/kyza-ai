"use client";

import { useRouter } from "next-nprogress-bar";

export default function LandingPageVideoFilters() {
  const router = useRouter();

  const searchQuery = ({ query }: { query: string }) => {
    const params = new URLSearchParams();
    params.set("search", query);
    router.push(`/media?${params}`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto grid grid-cols-3 gap-x-3 gap-y-2 mt-4">
      {["Cinema", "Animals", "Anime", "Cartoon", "Art", "Movies"].map((filter) => (
        <div key={filter} className="group relative transition-transform duration-300 active:scale-95">
          <button 
            className="relative z-10 w-full rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 p-0.5 duration-300 group-hover:scale-105"
            onClick={() => searchQuery({ query: filter.toLowerCase() })}
          >
            <span className="block rounded-full bg-slate-950 px-8 py-2 text-base font-medium text-slate-100 duration-300 group-hover:bg-slate-950/50 group-hover:text-slate-50 group-active:bg-slate-950/80">
              {filter}
            </span>
          </button>
          <span className="pointer-events-none absolute -inset-1 z-0 transform-gpu rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 opacity-30 blur-md transition-all duration-300 group-hover:opacity-90 group-active:opacity-50" />
        </div>
      ))}
    </div>
  );
}
