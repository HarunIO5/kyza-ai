import { utapi } from "./uploadthing";
import { cache } from "react";
import prisma from "./prisma";

export type MediaType = {
	id: string,
	createdAt: any,
	key?: string,
	prompt?: string,
	negativePrompt?: string,
	model?: string,
	url?: string,
	style?: string,
	scale?: string,
	fileSizeBytes?: number,
	type?: any,
	status?: any,
	userId: string,
	user: any,
	like?: any,
}

export async function GetVideoFiles ({limit, offset} : {limit: number, offset: number}) {

    // const fileList = await fetch('https://uploadthing.com/api/listFiles', {
	//   method: 'POST',
	//   headers: {
	//     'Content-Type': 'application/json',
	//     'X-Uploadthing-Api-Key': process.env.UPLOADTHING_SECRET!,
	//     'X-Uploadthing-Version': '6.4.0'
	//   },
	//   body: JSON.stringify({
	// 	limit: limit,
	// 	offset: offset
	//   })
	// })

	// // console.log('LIST FILE')

	// const viewFiles = await fileList.json()
	// console.log("VIEW FILES")
	// console.log(viewFiles)

	const files = await utapi.listFiles();

	let finalFiles = [] as any[]

	// Use map to create an array of promises
	const filePromises = files.map(async (file: any) => {
		// console.log(file)
		const oneUrl = await utapi.getFileUrls(file.key as string);

		// console.log("URL")
		// console.log(oneUrl)
	
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

export const GetMediaForModals = async ({id} : {id: string}) => {

	const media = await prisma.generations.findUnique({
		where: {
			key: id!
		}
	})


	return JSON.parse(JSON.stringify(media))

}

export const GetLatestMedia = async () => {

	const media = await prisma.generations.findMany()

	return JSON.parse(JSON.stringify(media))
}


export const SearchVideosDB = async ({search, skip}: {search?: string, skip: number}) => {

	const fullTextSearch = search?.split(' ').join(' | ') as string
	// console.log('FULL TEXT SEARCH')
	// console.log(fullTextSearch)

	try {
		const videos = await prisma.generations.findMany(
			{
				where: {
					prompt: {
						search: fullTextSearch,
						mode: "insensitive"
					}
				},
				skip: skip,
				take: 12
			}
		)

		return JSON.parse(JSON.stringify(videos))
		
	} catch (error) {
		return []
	}
		
}

export const SearchVideoLength = async ({search}: {search?: string}) => {

	const fullTextSearch = search?.split(' ').join(' | ') as string
	// console.log('FULL TEXT SEARCH')
	// console.log(fullTextSearch)

	try {

		const videos = await prisma.generations.findMany(
			{
				where: {
					prompt: {
						search: fullTextSearch,
						mode: "insensitive"
					}
				}
			}
		)
	
		return videos.length
		
	} catch (error) {
		return 0
	}
	
}