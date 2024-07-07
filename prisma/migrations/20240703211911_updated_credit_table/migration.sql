/*
  Warnings:

  - You are about to drop the column `freeCredits` on the `Credits` table. All the data in the column will be lost.
  - Added the required column `creditType` to the `Credits` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Credits" DROP COLUMN "freeCredits",
ADD COLUMN     "creditType" TEXT NOT NULL,
ALTER COLUMN "credits" DROP DEFAULT;
