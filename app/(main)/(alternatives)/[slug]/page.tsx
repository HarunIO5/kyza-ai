import { client } from "@/lib/sanity";
import { AlternativesType, alternativeFields } from "@/lib/sanity-queries";
import { urlFor } from "@/lib/sanityImageUrl";
import { Metadata } from "next";
import { Suspense, cache } from "react";
import AltCoverImage from "@/components/alt-cover-images";
import Image from "next/image";
import PostBody from "@/components/post-body";
import { Card, CardHeader, CardBody, CardFooter, Avatar } from "@nextui-org/react";
import Link from "next/link";
import MoreAlts from "@/components/more-alts";
import AltBody from "@/components/alt-body";
import { BounceCard } from "@/components/bounce-card";
import { CardTitle } from "@/components/card-title";
import { AuroraHero } from "@/components/aurora-hero";
import CTABanner from "@/components/cta-banner";

export async function generateStaticParams() {

    const altPages = await getLatestAltPages() as AlternativesType[]

    return altPages.map((alt) => alt.slug?.current)

}

export async function generateMetadata({
    params,
  }: {
    params: { slug: string };
  }): Promise<Metadata> {

    const { alternativePage, moreAlternativePages } = await getAlternativePages(params.slug)

    return {
        title: alternativePage.title,
        description: alternativePage.description,
        // https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image#generate-images-using-code-js-ts-tsx
        openGraph: {
          images: {
            url: urlFor(alternativePage.heroImage).url()
          }
        }
      }
}

async function getLatestAltPages() {
    const query = '*[_type == "alternatives"]';

    const data = await client.fetch(query) as AlternativesType[];

    return data
}

export const getAlternativePages = cache(async (slug: string): Promise<{ alternativePage: AlternativesType; moreAlternativePages: AlternativesType[] }> => {

    const query = `
    {
      "alternativePage": *[_type == "alternatives" && slug.current == "${slug}"][0]{
        ${alternativeFields}
      },
      "moreAlternativePages": *[_type == "alternatives" && slug.current != "${slug}"] | order(date desc, _createdAt desc) [0...9] {
        content,
        ${alternativeFields}
      }
    }`

    return await client.fetch(query)
})

export default async function AlternativePages ({
    params
}: {
   params: { slug: string } 
}) {

    const { alternativePage, moreAlternativePages } = await getAlternativePages(params.slug)
    // console.log('MORE ALTS')
    // console.log(alternativePage)

    return (
      <>
        <div className="min-h-screen w-full flex flex-col justify-center">
          {/* <div className="pb-24 md:px-24"> */}
            {/* <div className="w-full mx-auto flex flex-col md:flex-row justify-between gap-8">
                <div className="h-full my-auto">
                    <p className="text-4xl font-bold leading-tight tracking-tighter">
                        {alternativePage.title}
                    </p>
                    <p className="text-lg font-light text-foreground-500 max-w-[1000px]">
                        {alternativePage.description}
                    </p>
                </div>
                <div className="">
                  <AltCoverImage title={alternativePage.title!} image={alternativePage.heroImage} priority slug={alternativePage.slug} />
                </div>
            </div> */}
            <Suspense>
              <AuroraHero title={alternativePage.title!} description={alternativePage.description!} image={alternativePage.heroImage} slug={alternativePage.slug}/>
            </Suspense>
          {/* </div> */}
            <section id="learn-more" className="px-12 md:px-24 md:pt-12 pb-24 p-12">
                <p className="text-4xl text-center font-bold leading-tight tracking-tighter pb-8 md:pb-24">
                  {alternativePage.agTitle}
                </p>
                <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4 md:px-24">
                  <div>
                    <Image
                      className="h-auto w-full rounded"
                      width={1000}
                      height={1000}
                      alt={alternativePage.agImage1.alt || ""}
                      src={urlFor(alternativePage.agImage1.asset?._ref).height(1000).width(1000).url()}
                      sizes="100vw"
                      priority={true}
                    />
                    {alternativePage.agLink1 ? (
                      <Link href={alternativePage.agLink1!} target="_blank" className="text-md text-foreground-500 text-center pt-2">
                        {alternativePage.agImage1.alt}
                      </Link>
                    ) : (
                      <p className="text-md text-foreground-500 text-center pt-2">
                        {alternativePage.agImage1.alt}
                      </p>
                    )}
                  </div>
                  <div>
                    <Image
                      className="h-auto w-full rounded"
                      width={1000}
                      height={1000}
                      alt={alternativePage.agImage2.alt || ""}
                      src={urlFor(alternativePage.agImage2.asset?._ref).height(1000).width(1000).url()}
                      sizes="100vw"
                      priority={true}
                    />
                    {alternativePage.agLink2 ? (
                      <Link href={alternativePage.agLink2!} target="_blank" className="text-md text-foreground-500 text-center pt-2">
                        {alternativePage.agImage2.alt}
                      </Link>
                    ) : (
                      <p className="text-md text-foreground-500 text-center pt-2">
                        {alternativePage.agImage2.alt}
                      </p>
                    )}
                  </div>
                  <div>
                    <Image
                      className="h-auto w-full rounded"
                      width={1000}
                      height={1000}
                      alt={alternativePage.agImage3.alt || ""}
                      src={urlFor(alternativePage.agImage3.asset?._ref).height(1000).width(1000).url()}
                      sizes="100vw"
                      priority={true}
                    />
                    {alternativePage.agLink3 ? (
                      <Link href={alternativePage.agLink3!} target="_blank" className="text-md text-foreground-500 text-center pt-2">
                        {alternativePage.agImage3.alt}
                      </Link>
                    ) : (
                      <p className="text-md text-foreground-500 text-center pt-2">
                        {alternativePage.agImage3.alt}
                      </p>
                    )}
                  </div>
                  <div>
                    <Image
                      className="h-auto w-full rounded"
                      width={1000}
                      height={1000}
                      alt={alternativePage.agImage4.alt || ""}
                      src={urlFor(alternativePage.agImage4.asset?._ref).height(1000).width(1000).url()}
                      sizes="100vw"
                      priority={true}
                    />
                    {alternativePage.agLink4 ? (
                      <Link href={alternativePage.agLink4!} target="_blank" className="text-md text-foreground-500 text-center pt-2">
                        {alternativePage.agImage4.alt}
                      </Link>
                    ) : (
                      <p className="text-md text-foreground-500 text-center pt-2">
                        {alternativePage.agImage4.alt}
                      </p>
                    )}
                  </div>
                </div>
            </section>
            <section className="px-12 md:px-24 md:pt-12 pb-24">
                <p className="text-4xl font-bold leading-tight tracking-tighter">
                  {alternativePage.slTitle}
                </p>
                  <AltBody content={alternativePage.slBody!} />
            </section>

            <section className="px-12 md:px-24 md:pt-12 pb-24">
                <p className="text-4xl font-bold leading-tight tracking-tighter text-center pb-12">
                  Feature
                </p>
                <div className="mb-4 grid grid-cols-12 gap-4">
                  <BounceCard className="col-span-12 md:col-span-4">
                    <CardTitle>{alternativePage.firstFeatureTitle}</CardTitle>
                    <p className="text-md text-foreground-500 text-center pt-2">
                      {alternativePage.firstFeatureBody}
                    </p>
                    <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-violet-400 to-indigo-400 p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
                      <Image
                        className="h-auto w-full rounded"
                        width={1000}
                        height={1000}
                        alt={alternativePage.featureImage1.alt || ""}
                        src={urlFor(alternativePage.featureImage1.asset?._ref).height(1000).width(1000).url()}
                        sizes="100vw"
                        priority={true}
                      />
                    </div>
                  </BounceCard>
                  <BounceCard className="col-span-12 md:col-span-8">
                    <CardTitle>{alternativePage.secondFeatureTitle}</CardTitle>
                    <p className="text-md text-foreground-500 text-center pt-2">
                      {alternativePage.secondFeatureBody}
                    </p>
                    <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-amber-400 to-orange-400 p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
                    <Image
                        className="h-auto w-full rounded"
                        width={1000}
                        height={1000}
                        alt={alternativePage.featureImage2.alt || ""}
                        src={urlFor(alternativePage.featureImage2.asset?._ref).height(1000).width(1000).url()}
                        sizes="100vw"
                        priority={true}
                      />
                    </div>
                  </BounceCard>
                </div>
                <div className="grid grid-cols-12 gap-4">
                  <BounceCard className="col-span-12 md:col-span-8">
                    <CardTitle>{alternativePage.thirdFeatureTitle}</CardTitle>
                    <p className="text-md text-foreground-500 text-center pt-2">
                      {alternativePage.thirdFeatureBody}
                    </p>
                    <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-green-400 to-emerald-400 p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
                      <Image
                        className="h-auto w-full rounded"
                        width={1000}
                        height={1000}
                        alt={alternativePage.featureImage3.alt || ""}
                        src={urlFor(alternativePage.featureImage3.asset?._ref).height(1000).width(1000).url()}
                        sizes="100vw"
                        priority={true}
                      />
                    </div>
                  </BounceCard>
                  <BounceCard className="col-span-12 md:col-span-4">
                    <CardTitle>{alternativePage.fourthFeatureTitle}</CardTitle>
                    <p className="text-md text-foreground-500 text-center pt-2">
                      {alternativePage.fourthFeatureBody}
                    </p>
                    <div className="absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl bg-gradient-to-br from-pink-400 to-red-400 p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]">
                      <Image
                        className="h-auto w-full rounded"
                        width={1000}
                        height={1000}
                        alt={alternativePage.featureImage4.alt || ""}
                        src={urlFor(alternativePage.featureImage4.asset?._ref).height(1000).width(1000).url()}
                        sizes="100vw"
                        priority={true}
                      />
                    </div>
                  </BounceCard>
                </div>
            </section>

            <section className="px-12 md:px-24 md:pt-12 pb-24">
                <p className="text-4xl font-bold leading-tight tracking-tighter text-center pb-12">
                  {alternativePage.companyTestimonalTitle}
                </p>
                <div className="grid grid-cols-5 bg-slate-900 rounded-xl">
                  <Image
                      className="h-auto w-full rounded"
                      width={1000}
                      height={1000}
                      alt={alternativePage.logoImage1.alt || ""}
                      src={urlFor(alternativePage.logoImage1.asset?._ref).height(1000).width(1000).url()}
                      sizes="100vw"
                      priority={true}
                    />
                    <Image
                      className="h-auto w-full rounded"
                      width={1000}
                      height={1000}
                      alt={alternativePage.logoImage2.alt || ""}
                      src={urlFor(alternativePage.logoImage2.asset?._ref).height(1000).width(1000).url()}
                      sizes="100vw"
                      priority={true}
                    />
                    <Image
                      className="h-auto w-full rounded"
                      width={1000}
                      height={1000}
                      alt={alternativePage.logoImage3.alt || ""}
                      src={urlFor(alternativePage.logoImage3.asset?._ref).height(1000).width(1000).url()}
                      sizes="100vw"
                      priority={true}
                    />
                    <Image
                      className="h-auto w-full rounded"
                      width={1000}
                      height={1000}
                      alt={alternativePage.logoImage4.alt || ""}
                      src={urlFor(alternativePage.logoImage4.asset?._ref).height(1000).width(1000).url()}
                      sizes="100vw"
                      priority={true}
                    />
                    <Image
                      className="h-auto w-full rounded"
                      width={1000}
                      height={1000}
                      alt={alternativePage.logoImage5.alt || ""}
                      src={urlFor(alternativePage.logoImage5.asset?._ref).height(1000).width(1000).url()}
                      sizes="100vw"
                      priority={true}
                    />
                </div>
            </section >

            <section className="px-12 md:px-24 md:pt-12 pb-24">
                <p className="text-4xl font-bold leading-tight tracking-tighter pb-12">
                  Customer Stories
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Card className="p-4 bg-slate-200 dark:bg-slate-900">
                      <CardHeader className="w-full flex items-center justify-center">
                        <Image
                          className="h-[150px] w-[150px] rounded-full"
                          width={1000}
                          height={1000}
                          alt={alternativePage.personImage1.alt || ""}
                          src={urlFor(alternativePage.personImage1.asset?._ref).height(1000).width(1000).url()}
                          sizes="100vw"
                          priority={true}
                        />
                      </CardHeader>
                      <CardBody className="pt-8">
                        <PostBody content={alternativePage.firstPersonTestimonal} />
                      </CardBody>
                      <CardFooter className="pt-4 flex flex-col items-start">
                        <p className="text-md text-foreground-500">
                          {alternativePage.firstPersonName}
                        </p>
                        <p className="text-md text-foreground-500">
                          {alternativePage.firstPersonPosition}
                        </p>
                      </CardFooter>
                    </Card>
                  </div>
                  <div>
                    <Card className="pt-8 bg-slate-200 dark:bg-slate-900">
                      <CardHeader className="w-full flex items-center justify-center">
                        <Image
                          className="h-[150px] w-[150px] rounded-full"
                          width={1000}
                          height={1000}
                          alt={alternativePage.personImage2.alt || ""}
                          src={urlFor(alternativePage.personImage2.asset?._ref).height(1000).width(1000).url()}
                          sizes="100vw"
                          priority={true}
                        />
                      </CardHeader>
                      <CardBody className="pt-8">
                        <PostBody content={alternativePage.secondPersonTestimonal} />
                      </CardBody>
                      <CardFooter className="pt-4 flex flex-col items-start">
                        <p className="text-md text-foreground-500">
                          {alternativePage.secondPersonName}
                        </p>
                        <p className="text-md text-foreground-500">
                          {alternativePage.secondPersonPosition}
                        </p>
                      </CardFooter>
                    </Card>
                  </div>
                  <div>
                    <Card className="pt-8 bg-slate-200 dark:bg-slate-900">
                      <CardHeader className="w-full flex items-center justify-center">
                        <Image
                          className="h-[150px] w-[150px] rounded-full"
                          width={1000}
                          height={1000}
                          alt={alternativePage.personImage3.alt || ""}
                          src={urlFor(alternativePage.personImage3.asset?._ref).height(1000).width(1000).url()}
                          sizes="100vw"
                          priority={true}
                        />
                      </CardHeader>
                      <CardBody className="pt-8">
                        <PostBody content={alternativePage.thirdPersonTestimonal} />
                      </CardBody>
                      <CardFooter className="pt-4 flex flex-col items-start">
                        <p className="text-md text-foreground-500">
                          {alternativePage.thirdPersonName}
                        </p>
                        <p className="text-md text-foreground-500">
                          {alternativePage.thirdPersonPosition}
                        </p>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
            </section>

            {alternativePage.bannerText && (
              <section className="px-12 md:px-24 md:pt-12 pb-24">
                
                  <CTABanner 
                    bannerBtn={alternativePage.bannerBtn} 
                    bannerLink={alternativePage.bannerLink} 
                    bannerText={alternativePage.bannerText}
                  />
                
              </section>
            )}

            <section className="px-12 md:px-24 md:pt-12 pb-24">
                {moreAlternativePages?.length > 0 && <MoreAlts alts={moreAlternativePages} />}
            </section>
        </div>
        </>  
    );
}