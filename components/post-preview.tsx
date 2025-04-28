import Avatar from "@/components/author-ava";
import CoverImage from "@/components/cover-image";
import type { Post } from "@/lib/sanity-queries";
import Link from "next/link";

export default function PostPreview({
  title,
  mainImage,
  _updatedAt,
  excerpt,
  author,
  slug,
  _createdAt,
}: Omit<Post, "_id">) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage
          slug={slug}
          title={title!}
          image={mainImage}
          priority={false}
        />
      </div>
      <h3 className="mb-3 text-3xl leading-snug text-balance">
        <Link href={`/blog/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      {excerpt && (
        <p className="mb-4 text-lg leading-relaxed text-pretty">{excerpt}</p>
      )}
      {author && <Avatar name={author.name} image={author.image} />}
    </div>
  );
}
