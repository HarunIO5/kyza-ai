'use server'

import { GetVideoFiles, SearchVideosDB } from "@/lib/getVidFiles"

export async function fetchVideos ({limit, offset}: {limit: number, offset: number}) {

    const videos = await GetVideoFiles({limit: limit, offset: offset})

    return videos
}

export async function fetchSearchedVideos ({search, skip}: {search?: string, skip: number}) {
    const searchedVideos = await SearchVideosDB({search: search, skip: skip})

    return searchedVideos
}