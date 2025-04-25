/*
  Warnings:

  - You are about to drop the column `userId` on the `Generations` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Credits` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OneTimePurchases` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserFollows` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userEmail,generationId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Credits" DROP CONSTRAINT "Credits_userId_fkey";

-- DropForeignKey
ALTER TABLE "Generations" DROP CONSTRAINT "Generations_userId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_userId_fkey";

-- DropForeignKey
ALTER TABLE "OneTimePurchases" DROP CONSTRAINT "OneTimePurchases_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "_UserFollows" DROP CONSTRAINT "_UserFollows_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserFollows" DROP CONSTRAINT "_UserFollows_B_fkey";

-- DropIndex
DROP INDEX "Like_userId_generationId_key";

-- AlterTable
ALTER TABLE "Generations" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT;

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT;

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Credits";

-- DropTable
DROP TABLE "OneTimePurchases";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "VerificationToken";

-- DropTable
DROP TABLE "_UserFollows";

-- CreateIndex
CREATE UNIQUE INDEX "Like_userEmail_generationId_key" ON "Like"("userEmail", "generationId");
