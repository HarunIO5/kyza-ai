import FAQs from "./faqs";
import { title, subtitle } from "@/components/primitives";
import { WavesIcon } from "./icons";

export default function FAQSections () {
    return (
        <section className="w-full flex items-center justify-center flex-col">
            <div className="w-full text-center py-8">
                <h1 className={`${title()} text-center`}>Frequently Asked</h1>
			    <h1 className={title({ color: "violet" })}> Questions</h1>
            </div>
            <div className="w-full md:w-3/4">
                <FAQs />
            </div>
        </section>
    );
}