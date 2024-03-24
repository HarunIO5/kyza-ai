/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */
import { PortableText, type PortableTextReactComponents } from 'next-sanity'

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

export default function PostBody({ content }: {content: any}) {
  return (
    <div className="mx-auto max-w-5xl text-lg leading-relaxed prose">
      <PortableText value={content} components={myPortableTextComponents} />
    </div>
  )
}