import Image from "next/image";

export default function NotFound() {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Page Not Found</h1>
        <Image src={'/notfoundgif.gif'} alt="Not found 404 error image" width={800} height={800}/>
      </div>
    );
  }