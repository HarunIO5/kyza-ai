import AltPreview from './alt-preview'
import type { AlternativesType } from '@/lib/sanity-queries'

export default function MoreAlts({ alts }: { alts: AlternativesType[] }) {
  return (
    <section>
      <h2 className="mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl">
        Other Alternatives
      </h2>
      <div className="mb-32 grid grid-cols-1 gap-y-20 md:grid-cols-3 md:gap-x-16 md:gap-y-16 lg:gap-x-16">
        {alts.map((alt) => (
          <AltPreview
            key={alt._id}
            title={alt.title}
            heroImage={alt.heroImage}
            slug={alt.slug}
            description={alt.description}
            _createdAt={alt._createdAt}
            personImage2={alt.personImage2}
          />
        ))}
      </div>
    </section>
  )
}