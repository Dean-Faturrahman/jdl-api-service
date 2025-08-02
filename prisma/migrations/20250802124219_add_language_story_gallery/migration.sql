/*
  Warnings:

  - You are about to drop the column `content` on the `stories` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `stories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "stories" DROP COLUMN "content",
DROP COLUMN "title";

-- CreateTable
CREATE TABLE "story_translations" (
    "id" SERIAL NOT NULL,
    "language_code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "story_id" INTEGER NOT NULL,

    CONSTRAINT "story_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "galleries" (
    "id" SERIAL NOT NULL,
    "image_url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "galleries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gallery_translations" (
    "id" SERIAL NOT NULL,
    "language_code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "gallery_id" INTEGER NOT NULL,

    CONSTRAINT "gallery_translations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "story_translations_story_id_language_code_key" ON "story_translations"("story_id", "language_code");

-- CreateIndex
CREATE UNIQUE INDEX "gallery_translations_gallery_id_language_code_key" ON "gallery_translations"("gallery_id", "language_code");

-- AddForeignKey
ALTER TABLE "story_translations" ADD CONSTRAINT "story_translations_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "stories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gallery_translations" ADD CONSTRAINT "gallery_translations_gallery_id_fkey" FOREIGN KEY ("gallery_id") REFERENCES "galleries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
