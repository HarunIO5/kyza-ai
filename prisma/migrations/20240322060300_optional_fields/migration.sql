-- AlterTable
ALTER TABLE "LandingPageVideos" ALTER COLUMN "fileSizeBytes" DROP NOT NULL,
ALTER COLUMN "key" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SearchableVideos" ALTER COLUMN "fileSizeBytes" DROP NOT NULL,
ALTER COLUMN "key" DROP NOT NULL;
