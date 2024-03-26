import Image from "next/image";

export default function SearchFailed () {
    return (
        <div className="min-h-full text-center z-10">
            <h1 className="text-4xl z-10 font-bold">Search Failed</h1>
            <Image src={'/searchfailedgif.gif'} alt="Not found 404 error image" width={350} height={350} className="py-2"/>
            <h3>Try another search, plz :&apos)</h3>
        </div>
    );
}