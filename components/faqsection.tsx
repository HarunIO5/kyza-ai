import FAQs from "./faqs";
import { title, subtitle } from "@/components/primitives";

export default function FAQSections () {
    return (
        <section className="w-full">
            <div className="w-full text-center py-8">
                <h1 className={`${title()} text-center`}>Frequently Asked</h1>
			    <h1 className={title({ color: "violet" })}> Questions</h1>
            </div>
            <FAQs />
        </section>
    );
}