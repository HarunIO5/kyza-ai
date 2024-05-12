/*
  Warnings:

  - You are about to drop the `SearchableVideos` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ToolType" AS ENUM ('WALLPAPER_ENGINE', 'TEXT_TO_VIDEO');

-- DropTable
DROP TABLE "SearchableVideos";

-- CreateTable
CREATE TABLE "ToolWaitlist" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "tool" "ToolType" NOT NULL,

    CONSTRAINT "ToolWaitlist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ToolWaitlist_email_tool_key" ON "ToolWaitlist"("email", "tool");
