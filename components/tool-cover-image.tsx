
import { urlFor } from '@/lib/sanityImageUrl'
import Image from 'next/image'
import Link from 'next/link'

interface CoverImageProps {
  title: string
  slug?: string
  image: any
  priority?: boolean
  width?: number
}

export default function ToolCoverImage(props: CoverImageProps) {
  const { title, slug, image: source, priority, width } = props
  const image = source?.asset?._ref ? (
    <div>
      <Image
        className="h-auto w-full rounded-lg"
        width={2000}
        height={2000}
        alt=""
        src={urlFor(source).height(2000).width(width || 1000).url()}
        sizes="100vw"
        priority={priority}
      />
    </div>
  ) : (
    <div style={{ paddingTop: '50%', backgroundColor: '#ddd' }} />
  )

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  )
}