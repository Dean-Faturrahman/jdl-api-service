/*
  Warnings:

  - You are about to drop the column `book_url` on the `company_profiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "company_profiles" DROP COLUMN "book_url";

-- AlterTable
ALTER TABLE "trips" ADD COLUMN     "book_url" TEXT;
