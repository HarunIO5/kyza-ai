import { MetadataRoute } from "next";
import { client } from "@/lib/sanity";
import { AlternativesType, Post } from "@/lib/sanity-queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    
    const alternativePages = await client.fetch('*[_type == "alternatives"]') as AlternativesType[]
    const blogs = await client.fetch('*[_type == "post"]') as Post[]

    const blogPages: MetadataRoute.Sitemap = blogs.map((blog) => ({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${blog.slug?.current}`
    }))
    
    const altPages: MetadataRoute.Sitemap = alternativePages.map((alt) => ({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/${alt.slug?.current}`
    }))

    return [
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/videos`
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/text-to-video`
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/library`
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog`
        }, 
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/login`
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/register`
        },
        ...blogPages,
        ...altPages,
    ]
}