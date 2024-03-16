import { utapi } from "@/server/uploadthing";
import { cache } from "react";

export async function GetVideoFiles ({limit, offset} : {limit: number, offset: number}) {

    const fileList = await fetch('https://uploadthing.com/api/listFiles', {
	  method: 'POST',
	  headers: {
	    'Content-Type': 'application/json',
	    'X-Uploadthing-Api-Key': process.env.UPLOADTHING_SECRET!,
	    'X-Uploadthing-Version': '6.4.0'
	  },
	  body: JSON.stringify({
		limit: limit,
		offset: offset
	  })
	})

	// console.log('LIST FILE')

	const viewFiles = await fileList.json()
	// console.log("VIEW FILES")
	// console.log(viewFiles)

	let finalFiles = [] as any[]

	// Use map to create an array of promises
	const filePromises = viewFiles.files.map(async (file: any) => {
		const oneUrl = await utapi.getFileUrls(file.key);
	
		return {
		  url: oneUrl[0].url,
		  ...file
		};

		
	  });

	  // Use Promise.all to wait for all promises to resolve
	  finalFiles = await Promise.all(filePromises);

	//   console.log("FINAL FILES");
	//   console.log(finalFiles);

    return JSON.parse(JSON.stringify(finalFiles))

}