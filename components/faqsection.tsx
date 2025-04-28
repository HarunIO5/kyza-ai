import FAQs from "./faqs";
import { title, subtitle } from "@/components/primitives";
import { WavesIcon } from "./icons";

export default function FAQSections({
  faqTitle1,
  faqDescription1,
  faqTitle2,
  faqDescription2,
  faqTitle3,
  faqDescription3,
  faqTitle4,
  faqDescription4,
  faqTitle5,
  faqDescription5,
}: {
  faqTitle1: string;
  faqDescription1: string;
  faqTitle2: string;
  faqDescription2: string;
  faqTitle3: string;
  faqDescription3: string;
  faqTitle4: string;
  faqDescription4: string;
  faqTitle5: string;
  faqDescription5: string;
}) {
  return (
    <section className="w-full flex items-center justify-center flex-col">
      <div className="w-full text-center py-8">
        <h1 className={`${title()} text-center`}>Frequently Asked</h1>
        <h1 className={title({ color: "violet" })}> Questions</h1>
      </div>
      <div className="w-full md:w-3/4">
        <FAQs
          faqTitle1={faqTitle1}
          faqTitle2={faqTitle2}
          faqTitle3={faqTitle3}
          faqTitle4={faqTitle4}
          faqTitle5={faqTitle5}
          faqDescription1={faqDescription1}
          faqDescription2={faqDescription2}
          faqDescription3={faqDescription3}
          faqDescription4={faqDescription4}
          faqDescription5={faqDescription5}
        />
      </div>
    </section>
  );
}
