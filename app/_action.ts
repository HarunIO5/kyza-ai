'use server'

import { GetVideoFiles, SearchVideosDB } from "@/lib/getVidFiles"
import { getUser } from "@/lib/userFunctions"
import { sendEmail } from "@/lib/email/mailer"

export async function fetchVideos ({limit, offset}: {limit: number, offset: number}) {

    const videos = await GetVideoFiles({limit: limit, offset: offset})

    return videos
}

export async function fetchSearchedVideos ({search, skip}: {search?: string, skip: number}) {
    const searchedVideos = await SearchVideosDB({search: search, skip: skip})

    return searchedVideos
}

export async function getUserInfo(email: string) {
    const userInfo = await getUser(email)
    return userInfo
}

export async function sendTokenEmail(email: string, emailType: string, id: string) {
    const mail = await sendEmail(email, emailType, id)
    return  mail
}