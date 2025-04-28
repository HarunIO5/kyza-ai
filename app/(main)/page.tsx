import { utapi } from "@/lib/uploadthing";
import VidCard from "@/components/image-cards";
import { Suspense } from "react";
import LandingPageHeading from "@/components/landing-page-heading";
import { isMobileDevice } from "@/server/mobile-checker";
import LandingPageVideos from "@/components/landingVideos";
import SearchBar from "@/components/search";
import FAQSection from "@/components/faqsection";
import { BbblurryIcon } from "@/components/icons";
import { SaveSearchableVideos } from "@/lib/uploadVideos";
import ScrollingTestimonials from "@/components/testimonals";
import prisma from "@/lib/prisma";

export default function Home() {
  return (
    <section className="min-h-screen">
      <LandingPageHeading />
      <div className="w-full py-12 px-4">
        <LandingPageVideos />
      </div>
      <div className="w-full py-12">
        <ScrollingTestimonials />
      </div>
      <div className="w-full py-12 px-12">
        <FAQSection
          faqTitle1="What makes Kyza.ai different from other text-to-video platforms?"
          faqTitle2="Can Kyza.ai create videos for specific industries or niche topics?"
          faqTitle3="How much creative control do I have over my videos?"
          faqTitle4="How does Kyza.ai guarantee high-quality, accurate video generation?"
          faqTitle5="What if I have a problem using Kyza.ai?"
          faqDescription1="Kyza.ai is completely free, powered by the latest AI models, and offers instant downloads. Unlike other platforms, we combine cutting-edge technology with a huge library of creative assets — giving you full creative freedom without hidden costs."
          faqDescription2="Yes! Kyza.ai is built to be flexible for any industry or niche. Whether you need videos for education, marketing, gaming, or any specialized field, our platform adapts to your unique content needs."
          faqDescription3="You have total creative control: upload your own images, logos, and voiceovers, tweak settings, and personalize every detail to match your vision. Kyza.ai is made for creators who want to own their style."
          faqDescription4="We use state-of-the-art AI models and continuously refine our platform to ensure your videos are clear, grammatically correct, and visually engaging. Plus, our asset library boosts the quality even further."
          faqDescription5="Kyza.ai is completely free to use! If you ever run into any issues or need help, our support team is here for you. Just reach out through our contact page — we're happy to assist and make sure you get the best experience."
        />
      </div>
    </section>
  );
}
