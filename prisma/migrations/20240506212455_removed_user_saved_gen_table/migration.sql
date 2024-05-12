/*
  Warnings:

  - You are about to drop the `UserSavedGenerations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserSavedGenerations" DROP CONSTRAINT "UserSavedGenerations_userId_fkey";

-- DropTable
DROP TABLE "UserSavedGenerations";
