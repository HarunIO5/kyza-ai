
import { Accordion, AccordionItem, Card, CardFooter, CardHeader } from "@nextui-org/react";
import Image from "next/image";
import EmailInput from "@/components/email-inputs";
import { client } from "@/lib/sanity";
import { ToolPageType, toolFields } from "@/lib/sanity-queries";
import { urlFor } from "@/lib/sanityImageUrl";
import { Metadata } from "next";
import { cache } from "react";
import MoreTools from "@/components/more-tools";
import { title } from "@/components/primitives";
import FAQSections from "@/components/faqsection";

export async function generateStaticParams() {

    const toolPages = await getLatestToolsPages()

    return toolPages.map((tool) => tool.slug?.current)

}

export async function generateMetadata({
    params,
  }: {
    params: { slug: string };
  }): Promise<Metadata> {

    const { toolPage, moreToolPages } = await getToolPages(params.slug)

    console.log(toolPage)

    return {
        title: toolPage.title,
        description: toolPage.description,
        // https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image#generate-images-using-code-js-ts-tsx
        openGraph: {
          images: {
            url: urlFor(toolPage.heroImage).url()
          }
        }
      }
}

async function getLatestToolsPages() {
    const query = '*[_type == "toolPage"]';

    const data = await client.fetch(query) as ToolPageType[];

    return data
}

const getToolPages = cache(async (slug: string): Promise<{ toolPage: ToolPageType; moreToolPages: ToolPageType[] }> => {

    const query = `
    {
      "toolPage": *[_type == "toolPage" && slug.current == "${slug}"][0]{
        ${toolFields}
      },
      "moreToolPages": *[_type == "toolPage" && slug.current != "${slug}"] | order(date desc, _createdAt desc) [0...9] {
        content,
        ${toolFields}
      }
    }`

    return await client.fetch(query)
})

export default async function ToolsPages ({
    params
}: {
   params: { slug: string } 
}) {

    const { toolPage, moreToolPages } = await getToolPages(params.slug)

    console.log('TOOL PAGE')
    console.log(toolFields)

    return (
        <div className="min-h-screen w-full flex flex-col justify-center p-12">
          <div className="pb-24 md:px-24">
            <div className="w-full mx-auto flex flex-col md:flex-row justify-between gap-8">
                <div className="h-full my-auto ">
                    <p className="text-4xl font-bold text-center leading-tight tracking-tighter pb-2">
                        {toolPage.title}
                    </p>
                    <p className="text-lg font-light text-center text-foreground-500 max-w-[1000px]">
                        {toolPage.description}
                    </p>
                    {/* Create the client-sided inputs that activates this tool */}
                    {toolPage.emailWaitlist && (
                        <EmailInput tool={toolPage._type!}/>
                    )}
                    
                </div>
                <div className="">
                    <Image
                        className="h-auto w-full rounded-xl"
                        width={1000}
                        height={1000}
                        alt={toolPage.heroImage.alt || "Hero Image"}
                        src={urlFor(toolPage.heroImage.asset?._ref).height(1000).width(1000).url()}
                        sizes="100vw"
                        priority
                    />
                </div>
            </div>
          </div>
          <section className="md:px-24 md:pt-12 pb-24 md:p-12">
                <p className="text-4xl text-center font-bold leading-tight tracking-tighter pb-8">
                    {toolPage.subHeading}
                </p>
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:px-18">
                    <div className="flex flex-col">
                        <Card className="col-span-1 h-[300px]">
                            <Image
                                className="z-0 w-full h-full object-cover opacity-50"
                                width={1000}
                                height={1000}
                                priority
                                src={urlFor(toolPage.subImage1.asset?._ref).height(1000).width(1000).url()}
                                alt={toolPage.subImage1.alt || "Hero Image"}
                            />
                        </Card>
                        <div>
                            <p className=" text-center text-white font-medium text-large">{toolPage.subTitle1}</p>
                            <h4 className="text-center font-normal">{toolPage.subDescription1}</h4>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <Card className="col-span-1 h-[300px]">
                            <Image
                                className="z-0 w-full h-full object-cover opacity-50"
                                width={1000}
                                height={1000}
                                priority
                                src={urlFor(toolPage.subImage2.asset?._ref).height(1000).width(1000).url()}
                                alt={toolPage.subImage2.alt || "Hero Image"}
                            />
                        </Card>
                        <div>
                            <p className=" text-center text-white font-medium text-large">{toolPage.subTitle2}</p>
                            <h4 className="text-center font-normal">{toolPage.subDescription2}</h4>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <Card className="col-span-1 h-[300px]">
                            <Image
                                className="z-0 w-full h-full object-cover opacity-50"
                                width={1000}
                                height={1000}
                                priority
                                src={urlFor(toolPage.subImage3.asset?._ref).height(1000).width(1000).url()}
                                alt={toolPage.subImage3.alt || "Hero Image"}
                            />
                        </Card>
                        <div>
                            <p className=" text-center text-white font-medium text-large">{toolPage.subTitle3}</p>
                            <h4 className="text-center font-normal">{toolPage.subDescription3}</h4>
                        </div>
                    </div>
                
                </div>
            </section>
            <section className="md:px-24 md:pt-12 pb-24 md:p-12">
                <div className="w-full mx-auto flex flex-col md:flex-row justify-between gap-8">
                    <div className="">
                        <Image
                            className="h-auto w-full rounded-xl"
                            width={500}
                            height={500}
                            src={urlFor(toolPage.featureImage1.asset?._ref).height(500).width(500).url()}
                            alt={toolPage.featureImage1.alt || "Feature Image 1"}
                            sizes="50vw"
                            priority
                        />
                    </div>
                    <div className="h-full my-auto ">
                        <p className="text-4xl font-bold leading-tight tracking-tighter pb-2">
                            {toolPage.featureTitle1}
                        </p>
                        <p className="text-lg font-light text-foreground-500 max-w-[1000px]">
                            {toolPage.featureDescription1}
                        </p>
                    </div>
                </div>
                <div className="w-full mx-auto flex flex-col md:flex-row justify-between gap-8 mt-20">
                    <div className="h-full my-auto ">
                        <p className="text-4xl font-bold leading-tight tracking-tighter pb-2">
                            {toolPage.featureTitle2}
                        </p>
                        <p className="text-lg font-light text-foreground-500 max-w-[1000px]">
                            {toolPage.featureDescription2}
                        </p>
                    </div>
                    <div className="">
                        <Image
                            className="h-auto w-full rounded-xl"
                            width={500}
                            height={500}
                            src={urlFor(toolPage.featureImage2.asset?._ref).height(500).width(500).url()}
                            alt={toolPage.featureImage2.alt || "Feature Image 2"}
                            sizes="50vw"
                            priority
                        />
                    </div>
                </div>
            </section>
            <section className="w-full py-12">
                <FAQSections 
			    	faqTitle1={toolPage.faqTitle1!}
			    	faqTitle2={toolPage.faqTitle2!}
			    	faqTitle3={toolPage.faqTitle3!}
			    	faqTitle4={toolPage.faqTitle4!}
			    	faqTitle5={toolPage.faqTitle5!}
			    	faqDescription1={toolPage.faqDescription1!}
			    	faqDescription2={toolPage.faqDescription2!}
			    	faqDescription3={toolPage.faqDescription3!}
			    	faqDescription4={toolPage.faqDescription4!}
			    	faqDescription5={toolPage.faqDescription5!}
			    />
			</section>
            <section className="px-12 md:px-24 md:pt-12 pb-24">
                {moreToolPages?.length > 0 && <MoreTools tools={moreToolPages} />}
            </section>
        </div>
    );

}