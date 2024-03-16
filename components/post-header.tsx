import Avatar from '@/components/author-ava'
import CoverImage from '@/components/cover-image'
import type { Post } from '@/lib/sanity-queries'

export default function PostHeader(
  props: Pick<Post, 'title' | 'mainImage' | '_updatedAt' | 'author' | 'slug'>,
) {
  const { title, mainImage, _updatedAt, author, slug } = props
  return (
    <>
        <h1 className="mb-12 text-center text-6xl font-bold leading-tight tracking-tighter md:text-left md:text-7xl md:leading-none lg:text-8xl text-balance">
            {title}
        </h1>
        <div className="hidden md:mb-12 md:block">
          {author && <Avatar name={author.name} image={author.image} />}
        </div>
        <div className="mb-8 sm:mx-0 md:mb-16">
          <CoverImage title={title!} image={mainImage} priority slug={slug} />
        </div>
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 block md:hidden">
            {author && <Avatar name={author.name} image={author.image} />}
          </div>
          <div className="mb-6 text-lg">
          {new Date(_updatedAt!).toISOString().split("T")[0]}
          </div>
        </div>
    </>
  )
}