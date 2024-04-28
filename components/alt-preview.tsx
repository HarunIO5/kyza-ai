import Avatar from '@/components/author-ava'
import AltCoverImage from '@/components/cover-image'
import type { Post, AlternativesType } from '@/lib/sanity-queries'
import { Button } from '@nextui-org/button'
import { Card, CardBody } from '@nextui-org/react'
import Link from 'next/link'

export default function AltPreview({
  title,
  heroImage,
  _createdAt,
  description,
  slug,
}: Omit<AlternativesType, '_id'>) {
  return (
    <Card className='bg-slate-200 dark:bg-gray-900'>
      <div className="mb-5">
        <AltCoverImage
          slug={slug}
          title={title!}
          image={heroImage}
          priority={false}
        />
      </div>
      <CardBody className="p-4 flex justify-between">
        <h3 className="mb-3 text-3xl leading-snug text-balance">
          <Link href={`/${slug}`} className="hover:underline">
            {title}
          </Link>
        </h3>
        <div className="mb-4 text-lg flex flex-row justify-between">
            {new Date(_createdAt!).toISOString().split("T")[0]}
            <Link href={`/${slug}`}>
                <Button className=' bg-fuchsia-500 dark:bg-cyan-500 rounded-2xl'>
                    View
                </Button>
            </Link>
        </div>
      </CardBody>
    </Card>
  )
}