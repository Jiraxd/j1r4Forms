/*
  Warnings:

  - Added the required column `answerPos` to the `FormAnswer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FormAnswer" ADD COLUMN     "answerPos" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "SharableLinkForm" (
    "formid" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SharableLinkForm_pkey" PRIMARY KEY ("link")
);
