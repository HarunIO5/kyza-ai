"use server";

import {
  GetLatestMedia,
  GetMediaForModals,
  SearchVideosDB,
} from "@/lib/getVidFiles";

// export async function fetchVideos({
//   limit,
//   offset,
// }: {
//   limit: number;
//   offset: number;
// }) {
//   const videos = await GetVideoFiles({ limit: limit, offset: offset });

//   return videos;
// }

export async function fetchSearchedVideos({
  search,
  skip,
}: {
  search?: string;
  skip: number;
}) {
  const searchedVideos = await SearchVideosDB({ search: search, skip: skip });

  return searchedVideos;
}

export async function getMediaModal({ id }: { id: string }) {
  const media = await GetMediaForModals({ id: id });

  return media;
}

export async function getLatestMediaPosts() {
  const media = await GetLatestMedia();

  return media;
}
