import prisma from "@/lib/prisma";

export async function SaveSearchableVideos ({key, prompt, url, fileSizeBytes, model}: {key: string, prompt: string, url: string, fileSizeBytes?: number, model?: string}) {


    const findVideo = await prisma.searchableVideos.findUnique({
        where: {
            key: key!
        }
    })

    if(findVideo) {
        return "Video Already Exists"
    } else {
        const videos = await prisma.searchableVideos.create({
            data: {
                key: key,
                prompt: prompt,
                url: url,
                fileSizeBytes: fileSizeBytes,
                model: model,
            }
        })
    
        return videos.id
    }

}