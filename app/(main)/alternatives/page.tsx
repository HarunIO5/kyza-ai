import { WavesIcon } from "@/components/icons";
import { subtitle, title } from "@/components/primitives";
import { cache } from "react";
import { AlternativesType, alternativeFields } from "@/lib/sanity-queries";
import { client } from "@/lib/sanity";
import AltPreview from "@/components/alt-preview";

const getAlternativePages = cache(async (): Promise<{ moreAlternativePages: AlternativesType[] }> => {

    const query = `
    {
      "moreAlternativePages": *[_type == "alternatives"] | order(date desc, _createdAt desc) {
        content,
        ${alternativeFields}
      }
    }`

    return await client.fetch(query)
})

export default async function AlternativePage () {

    const { moreAlternativePages } = await getAlternativePages()

    return (
        <div className="w-full flex flex-col items-center justify-center gap-4 p-8  md:p-10">
            <WavesIcon className="absolute -z-8 bottom-0 left-0 right-0 top-60 md:top-12 h-120% w-full opacity-0"/>
			<div className="px-4 inline-block max-w-xl text-center justify-center z-10 pt-4">
				<h1 className={title()}>Alternatives&nbsp;</h1>
				<h2 className={subtitle({ class: "mt-4" })}>
					Research the latest alternative tools and products in the market today!
				</h2>
	    	</div>
            <div className="mb-32 grid grid-cols-1 gap-y-20 md:grid-cols-3 md:gap-x-16 md:gap-y-16 lg:gap-x-16">
                {moreAlternativePages.map((alt) => (
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
        </div>
    );
}