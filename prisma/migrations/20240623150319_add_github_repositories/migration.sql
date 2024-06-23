-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "GitgubRepository" (
    "id" TEXT NOT NULL,
    "repoId" INTEGER NOT NULL,

    CONSTRAINT "GitgubRepository_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GitgubRepositoryToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GitgubRepositoryToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "GitgubRepository_repoId_key" ON "GitgubRepository"("repoId");

-- CreateIndex
CREATE INDEX "Tag_name_idx" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "Tag_slug_idx" ON "Tag"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_createdById_key" ON "Tag"("name", "createdById");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_slug_createdById_key" ON "Tag"("slug", "createdById");

-- CreateIndex
CREATE UNIQUE INDEX "_GitgubRepositoryToTag_AB_unique" ON "_GitgubRepositoryToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_GitgubRepositoryToTag_B_index" ON "_GitgubRepositoryToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GitgubRepositoryToUser_AB_unique" ON "_GitgubRepositoryToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_GitgubRepositoryToUser_B_index" ON "_GitgubRepositoryToUser"("B");

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GitgubRepositoryToTag" ADD CONSTRAINT "_GitgubRepositoryToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "GitgubRepository"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GitgubRepositoryToTag" ADD CONSTRAINT "_GitgubRepositoryToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GitgubRepositoryToUser" ADD CONSTRAINT "_GitgubRepositoryToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "GitgubRepository"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GitgubRepositoryToUser" ADD CONSTRAINT "_GitgubRepositoryToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
