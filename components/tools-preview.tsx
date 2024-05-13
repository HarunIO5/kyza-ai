import Avatar from '@/components/author-ava'
import AltCoverImage from '@/components/alt-cover-images'
import type { ToolPageType } from '@/lib/sanity-queries'
import { Button } from '@nextui-org/button'
import { Card, CardBody, CardFooter } from '@nextui-org/react'
import Link from 'next/link'
import ToolCoverImage from '@/components/tool-cover-image'

export default function ToolsPreview({
  title,
  heroImage,
  _createdAt,
  description,
  slug,
}: Omit<ToolPageType, '_id'>) {
  return (
    <Card className='bg-slate-200 dark:bg-gray-900' isFooterBlurred>
      <div className="">
        <ToolCoverImage
          slug={`tools/${slug}`}
          title={title!}
          image={heroImage}
          priority={false}
          width={2000}
        />
      </div>
      <CardFooter className="flex flex-col justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <h3 className="mb-3 text-3xl text-center font-bold leading-snug text-balance">
          <Link href={`/tools/${slug}`} className="hover:underline text-white/80">
            {title}
          </Link>
        </h3>
        <div className="w-full mb-4 text-lg flex flex-row justify-between">
            <Link href={`/tools/${slug}`} className='w-full'>
                <Button className='w-full font-semibold text-lg bg-fuchsia-500 dark:bg-cyan-500 rounded-2xl'>
                    Try App
                </Button>
            </Link>
        </div>
      </CardFooter>
    </Card>
  )
}