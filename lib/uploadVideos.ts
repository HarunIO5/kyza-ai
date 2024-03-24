import prisma from "@/lib/prisma";

export async function SaveSearchableVideos (key: string, prompt: string, url: string, fileSizeBytes?: number) {

    const videos = await prisma.searchableVideos.create({
        data: {
            key: key,
            prompt: prompt,
            url: url,
            fileSizeBytes: fileSizeBytes
        }
    })

    return videos.id

}