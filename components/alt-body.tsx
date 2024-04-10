import {PortableText, type PortableTextReactComponents} from '@portabletext/react'

import Image from 'next/image'
import { urlFor } from '@/lib/sanityImageUrl'

const myPortableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => {
      return (
        <Image
            src={urlFor(value).url()}
            alt="Image"
            className="(max-width: 800px) 100vw, 800px"
            width={800}
            height={800}
        />
        )
    },
  },
}

export default function AltBody({ content }: {content: any}) {
    return (
      <div className="text-md text-foreground-500 pt-2 leading-relaxed prose-invert prose-lg">
        <PortableText value={content} components={myPortableTextComponents} />
      </div>
    )
  }