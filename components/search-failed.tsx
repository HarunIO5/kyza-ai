import Image from "next/image";

export default function SearchFailed({ search }: { search: string }) {
  return (
    <div className="min-h-full flex flex-col justify-center items-center z-10">
      <h1 className="text-4xl text-center z-10 font-bold">
        Search for &ldquo;{search}&ldquo; Not Found
      </h1>
      <Image
        src={"/searchfailedgif.gif"}
        alt="Not found 404 error image"
        width={300}
        height={300}
        className="py-4"
      />
      <h3>Try another search, plz :&apos;)</h3>
    </div>
  );
}
