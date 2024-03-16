import AuthorAvatar from '@/components/author-ava'
import CoverImage from './cover-image'
import type { Post } from '@/lib/sanity-queries'
import Link from 'next/link'

export default function HeroPost(
  props: Pick<
    Post,
    'title' | 'mainImage' | '_updatedAt' | 'excerpt' | 'author' | 'slug'
  >,
) {
  const { title, mainImage, _updatedAt, excerpt, author, slug } = props
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage slug={slug} title={title!} image={mainImage} priority />
      </div>
      <div className="mb-20 md:mb-28 md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8">
        <div>
          <h3 className="mb-4 text-4xl leading-tight lg:text-6xl text-balance">
            <Link href={`/blog/${slug}`} className="hover:underline">
              {title || 'Untitled'}
            </Link>
          </h3>
          <div className="mb-4 text-lg md:mb-0">
            {new Date(_updatedAt!).toISOString().split("T")[0]}
          </div>
        </div>
        <div>
          {excerpt && (
            <p className="mb-4 text-lg leading-relaxed text-pretty">
              {excerpt}
            </p>
          )}
          {author && (
            <AuthorAvatar name={author.name} image={author.image} />
          )}
        </div>
      </div>
    </section>
  )
}