import AltPreview from './alt-preview'
import type { ToolPageType } from '@/lib/sanity-queries'
import ToolsPreview from '@/components/tools-preview'

export default function MoreTools({ tools }: { tools: ToolPageType[] }) {
  return (
    <section>
      <h2 className="mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl">
        Other Tools
      </h2>
      <div className="mb-32 grid grid-cols-1 gap-y-20 md:grid-cols-3 md:gap-x-16 md:gap-y-16">
        {tools.map((tool) => (
          <ToolsPreview
            key={tool._id}
            title={tool.title}
            heroImage={tool.heroImage}
            slug={tool.slug}
            description={tool.description}
            _createdAt={tool._createdAt}
            _type={tool._type}
            emailWaitlist={tool.emailWaitlist}
            toolType={tool.toolType}
            thumbnailImage={tool.thumbnailImage}
          />
        ))}
      </div>
    </section>
  )
}