'use server'

import { GetVideoFiles } from "@/lib/getVidFiles"

export async function fetchVideos ({limit, offset}: {limit: number, offset: number}) {

    const videos = await GetVideoFiles({limit: limit, offset: offset})

    return videos
}