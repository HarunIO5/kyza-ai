import { WavesIcon } from "@/components/icons";
import { subtitle, title } from "@/components/primitives";
import ToolsPreview from "@/components/tools-preview";
import { client } from "@/lib/sanity";
import { ToolPageType, toolFields } from "@/lib/sanity-queries";
import { cache } from "react";

const getToolPages = cache(async (): Promise<{ moreToolPages: ToolPageType[] }> => {

    const query = `
    {
      "moreToolPages": *[_type == "toolPage"] | order(date desc, _createdAt desc) {
        content,
        ${toolFields}
      }
    }`

    return await client.fetch(query)
})

export default async function MainToolPage () {

    const {moreToolPages} = await getToolPages()

    return (
        <div className="w-full flex flex-col items-center justify-center gap-4 p-8  md:p-10">
            <WavesIcon className="absolute -z-8 bottom-0 left-0 right-0 top-60 md:top-12 h-120% w-full opacity-50"/>
			<div className="px-4 inline-block max-w-xl text-center justify-center z-10 pt-4">
				<h1 className={title()}>AI Tools&nbsp;</h1>
				<h2 className={subtitle({ class: "mt-4" })}>
					Try the latest AI tools and products on Kyza today!
				</h2>
	    	</div>
            <div className="mb-32 grid grid-cols-1 gap-y-20 md:grid-cols-3 md:gap-x-16 md:gap-y-16 lg:gap-x-16">
                {moreToolPages.map((tool) => (
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
                  />
                ))}
            </div>
        </div>
    );
}