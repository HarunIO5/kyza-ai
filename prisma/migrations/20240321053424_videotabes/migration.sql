-- CreateTable
CREATE TABLE "SearchableVideos" (
    "id" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "fileSizeBytes" INTEGER NOT NULL,

    CONSTRAINT "SearchableVideos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LandingPageVideos" (
    "id" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "fileSizeBytes" INTEGER NOT NULL,

    CONSTRAINT "LandingPageVideos_pkey" PRIMARY KEY ("id")
);
