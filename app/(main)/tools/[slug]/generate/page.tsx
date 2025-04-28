import AnimateDiffForm from "@/components/animate-diff-form";
import { title, subtitle } from "@/components/primitives";
import { WavesIcon } from "@/components/icons";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { getAnimateDiffOrder, getUser } from "@/lib/userFunctions";
import { Suspense } from "react";
// import { checkCreditLimit, getTotalCreditCount } from "@/lib/credit-check";
import { Metadata } from "next";
import SSRGenerateTTVForm from "@/components/ssr-generate-form";
import SSRGenerateTTIForm from "@/components/ssr-gen-TTI";
import LoadingGeneratePage from "@/components/loading-generate";
import AIGhiblifyForm from "@/components/ai-ghiblify-form";
import HyperRealisticVideoForm from "@/components/hyper-realistic-form";
import GenerativeArtForm from "@/components/generative-art-form";
import AnimeImagesForm from "@/components/anime-images-form";
import PixelArtForm from "@/components/pixel-art-form";
import WallpaperEngineForm from "@/components/wallpaper-engine-form";

export const metadata: Metadata = {
  title: `Generate AI Videos & Images`,
};

export default async function GeneratePage({
  params,
}: {
  params: { slug: string };
}) {
  //   const session = await getServerSession(authOptions);

  // const animateDiffOrder = await getAnimateDiffOrder(session?.user?.email!) // GET RID AFTER CREDIT CHECK WORKS

  // const user = await getUser(session?.user?.email!) // GET RID AFTER CREDIT CHECK WORKS

  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-12">
      <WavesIcon className="absolute -z-8 bottom-0 left-0 right-0 top-60 md:top-12 h-120% w-full opacity-40" />
      {params.slug == "text-to-video" && (
        <Suspense fallback={<LoadingGeneratePage />}>
          <SSRGenerateTTVForm />
        </Suspense>
      )}

      {params.slug == "text-to-image" && (
        <Suspense fallback={<LoadingGeneratePage />}>
          <SSRGenerateTTIForm />
        </Suspense>
      )}

      {params.slug == "ai-ghiblify" && (
        <Suspense fallback={<LoadingGeneratePage />}>
          <AIGhiblifyForm />
        </Suspense>
      )}

      {params.slug == "hyper-realistic-video" && (
        <Suspense fallback={<LoadingGeneratePage />}>
          <HyperRealisticVideoForm />
        </Suspense>
      )}

      {params.slug == "generative-art" && (
        <Suspense fallback={<LoadingGeneratePage />}>
          <GenerativeArtForm />
        </Suspense>
      )}

      {params.slug == "anime-art" && (
        <Suspense fallback={<LoadingGeneratePage />}>
          <AnimeImagesForm />
        </Suspense>
      )}

      {params.slug == "pixel-art" && (
        <Suspense fallback={<LoadingGeneratePage />}>
          <PixelArtForm />
        </Suspense>
      )}

      {params.slug == "wallpaper-engine" && (
        <Suspense fallback={<LoadingGeneratePage />}>
          <WallpaperEngineForm />
        </Suspense>
      )}
    </div>
  );
}
