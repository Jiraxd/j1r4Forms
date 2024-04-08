/*
  Warnings:

  - The primary key for the `FormAnswer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `answerID` was added to the `FormAnswer` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "FormAnswer" DROP CONSTRAINT "FormAnswer_pkey",
ADD COLUMN     "answerID" TEXT NOT NULL,
ADD CONSTRAINT "FormAnswer_pkey" PRIMARY KEY ("answerID");
