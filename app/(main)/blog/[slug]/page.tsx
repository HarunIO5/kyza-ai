import { client } from "@/lib/sanity";
import type { Post, Settings } from '@/lib/sanity-queries'
import { postBySlugQuery, indexQuery, postFields, postAndMoreStoriesQuery } from "@/lib/sanity-queries";
import { urlFor } from "@/lib/sanityImageUrl";
import PostHeader from "@/components/post-header";
import { ArrowLeft } from "@/components/icons";
import PostBody from "@/components/post-body";
import { Metadata } from "next";
import { cache } from "react";
import Link from "next/link";
import { Card, CardBody, Divider } from "@nextui-org/react";
import MoreStories from "@/components/more-stories";
import CTABanner from "@/components/cta-banner";

export async function generateStaticParams() {

  const posts = (await getLatestPost()) as Post[];

  return posts.map((post) => post.slug?.current)
  
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {

  const {post, morePosts} = (await getMorePost(params.slug));

  return {
    title: post.title,
    description: post.excerpt,
    // https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image#generate-images-using-code-js-ts-tsx
    openGraph: {
      images: {
        url: urlFor(post.mainImage).url()
      }
    }

  }
}

async function getLatestPost() {
    const query = '*[_type == "post"]';
  
    const data = await client.fetch(query) as Post[];
  
    return data;
  }

  const getMorePost = cache(async (slug: string): Promise<{ post: Post; morePosts: Post[] }> => {

  const query = `
  {
    "post": *[_type == "post" && slug.current == "${slug}"][0]{
      ${postFields}
    },
    "morePosts": *[_type == "post" && slug.current != "${slug}"] | order(date desc, _updatedAt desc) [0...2] {
      content,
      ${postFields}
    }
  }`

  return await client.fetch(query);
})

export default async function SlugPage ({
    params,
  }: {
    params: { slug: string };
  }) {

    const {post, morePosts} = (await getMorePost(params.slug));
    console.log('POST')
    console.log(post)

    return (
      <div>
        <header>
          <h2 className="mb-20 mt-8 text-2xl font-bold leading-tight tracking-tight md:text-2xl md:tracking-tighter text-pretty">
            <Link href="/blog" className="flex flex-row items-center gap-4 hover:underline">
                <ArrowLeft  className="h-6 w-6"/>
                Go to blogs
            </Link>
          </h2>
        </header>
        <article>
            <PostHeader
              title={post.title}
              mainImage={post.mainImage}
              _updatedAt={post._updatedAt}
              author={post.author}
            />
            <PostBody content={post.body} />
        </article>
        <div className="mx-auto max-w-5xl pt-12">
          <CTABanner 
            bannerBtn={post.bannerBtn} 
            bannerText={post.bannerText} 
            bannerLink={post.bannerLink}
          />
        </div>
        <Divider className="mb-24 mt-28"/>
        {morePosts?.length > 0 && <MoreStories posts={morePosts} />}
      </div>
    );
} 