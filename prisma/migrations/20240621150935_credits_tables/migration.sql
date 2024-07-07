-- CreateTable
CREATE TABLE "Credits" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productType" TEXT NOT NULL,
    "freeCredits" INTEGER NOT NULL DEFAULT 3,
    "credits" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Credits_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Credits" ADD CONSTRAINT "Credits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
