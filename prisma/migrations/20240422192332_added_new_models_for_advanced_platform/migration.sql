-- CreateEnum
CREATE TYPE "Type" AS ENUM ('SHORTVIDEO', 'IMAGE');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateEnum
CREATE TYPE "ReactionType" AS ENUM ('LIKE', 'DISLIKE');

-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "generationId" TEXT NOT NULL,
    "reaction" "ReactionType" NOT NULL DEFAULT 'LIKE',

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Generations" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "key" TEXT,
    "prompt" TEXT,
    "model" TEXT,
    "url" TEXT,
    "style" TEXT,
    "scale" TEXT,
    "type" "Type" NOT NULL DEFAULT 'SHORTVIDEO',
    "status" "Status" NOT NULL DEFAULT 'PUBLIC',
    "userId" TEXT NOT NULL,

    CONSTRAINT "Generations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserFollows" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_generationId_key" ON "Like"("userId", "generationId");

-- CreateIndex
CREATE UNIQUE INDEX "Generations_key_key" ON "Generations"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Generations_url_key" ON "Generations"("url");

-- CreateIndex
CREATE UNIQUE INDEX "_UserFollows_AB_unique" ON "_UserFollows"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFollows_B_index" ON "_UserFollows"("B");

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_generationId_fkey" FOREIGN KEY ("generationId") REFERENCES "Generations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Generations" ADD CONSTRAINT "Generations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFollows" ADD CONSTRAINT "_UserFollows_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFollows" ADD CONSTRAINT "_UserFollows_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
