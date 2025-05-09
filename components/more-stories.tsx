import PostPreview from '@/components/post-preview'
import type { Post } from '@/lib/sanity-queries'

export default function MoreStories({ posts }: { posts: Post[] }) {
  return (
    <section>
      <h2 className="mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl">
        More Stories
      </h2>
      <div className="mb-32 grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-16 md:gap-y-32 lg:gap-x-32">
        {posts.map((post) => (
          <PostPreview
            key={post._id}
            title={post.title}
            mainImage={post.mainImage}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
            body={post.body}
            _createdAt={post._createdAt}
            _updatedAt={post._updatedAt}
          />
        ))}
      </div>
    </section>
  )
}