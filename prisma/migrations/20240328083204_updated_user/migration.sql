/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "SearchableVideos" ADD COLUMN     "model" TEXT;

-- CreateTable
CREATE TABLE "OneTimePurchases" (
    "id" TEXT NOT NULL,
    "productType" TEXT NOT NULL,
    "credits" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "products" JSONB,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "userId" TEXT NOT NULL,

    CONSTRAINT "OneTimePurchases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSavedGenerations" (
    "id" TEXT NOT NULL,
    "productType" TEXT NOT NULL,
    "model" TEXT,
    "prompt" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserSavedGenerations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- AddForeignKey
ALTER TABLE "OneTimePurchases" ADD CONSTRAINT "OneTimePurchases_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSavedGenerations" ADD CONSTRAINT "UserSavedGenerations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
