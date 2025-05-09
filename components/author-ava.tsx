import { urlFor } from '@/lib/sanityImageUrl'
import type { Author } from '@/lib/sanity-queries'
import Image from 'next/image'

export default function AuthorAvatar(props: Author) {
  const { name, image } = props
  return (
    <div className="flex items-center">
      <div className="relative mr-4 h-12 w-12">
        <Image
          src={
            image?.asset?._ref
              ? urlFor(image).height(96).width(96).fit('crop').url()
              : 'https://source.unsplash.com/96x96/?face'
          }
          className="rounded-full"
          height={96}
          width={96}
          alt={ image?.alt ?? name}
        />
      </div>
      <div className="text-xl font-bold text-balance">{name}</div>
    </div>
  )
}