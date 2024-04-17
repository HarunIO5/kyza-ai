import prisma from "@/lib/prisma";

export async function SaveSearchableVideos ({key, prompt, url, fileSizeBytes, model, status }: {key: string, prompt: string, url: string, fileSizeBytes?: number, model?: string, status?: string}) {


    const findVideo = await prisma.searchableVideos.findUnique({
        where: {
            key: key!
        }
    })

    if(!findVideo) {
        console.log('About to Upload')
        if (status == 'Uploaded') {
            const videos = await prisma.searchableVideos.create({
                data: {
                    key: key,
                    prompt: prompt,
                    url: url,
                    fileSizeBytes: fileSizeBytes,
                    model: model,
                }
            })
            console.log('Uploading')
            return videos.id
        } else {
            console.log('Failed Uploading')
            return 'UT Failed Upload'
        }
    } else {
        // console.log('Video')
        // console.log(findVideo)
        return "Video Already Exists"
    }
}