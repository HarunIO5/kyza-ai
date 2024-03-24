/*
  Warnings:

  - Added the required column `key` to the `LandingPageVideos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `SearchableVideos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LandingPageVideos" ADD COLUMN     "key" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SearchableVideos" ADD COLUMN     "key" TEXT NOT NULL;
