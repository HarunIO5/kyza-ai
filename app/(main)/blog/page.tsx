import { title } from "@/components/primitives";
import type { Post, Settings } from '@/lib/sanity-queries'
import { indexQuery } from "@/lib/sanity-queries";
import HeroPost from '@/components/hero-blog'
import { client } from "@/lib/sanity";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/sanityImageUrl";
import { PortableText } from "@portabletext/react";
import MoreStories from "@/components/more-stories";
import { Suspense } from "react";

export interface IndexPageProps {
	preview?: boolean
	loading?: boolean
	posts: Post[]
	settings: Settings
  }

  async function getData() {
	const query = indexQuery;
  
	const data = await client.fetch(query);
  
	return data;
  }

export default async function BlogPage() {
	const data = (await getData()) as Post[];
	const [heroPost, ...morePosts] = data || []

	return (
		<div>
			<header className="mb-10 mt-16 flex flex-col items-center md:mb-12 md:flex-row md:justify-between text-pretty">
				<h1 className="text-6xl font-bold leading-tight tracking-tighter md:pr-8 md:text-8xl">Blog</h1>
			</header>
			{heroPost && (
            	<HeroPost
            	  title={heroPost.title}
            	  mainImage={heroPost.mainImage}
            	  _updatedAt={heroPost._updatedAt}
            	  author={heroPost.author}
            	  slug={heroPost.slug}
            	  excerpt={heroPost.excerpt}
            	/>
          )}
		  {morePosts.length > 0 && <MoreStories posts={morePosts} />}
		</div>
	);
}
