-- AlterEnum
ALTER TYPE "ToolType" ADD VALUE 'SPOTIFY_CANVAS';

-- AlterTable
ALTER TABLE "ToolWaitlist" ADD COLUMN     "toolType" TEXT,
ALTER COLUMN "tool" DROP NOT NULL;
