/*
  Warnings:

  - You are about to drop the `AnswersUserForm` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `answer` to the `UserAnswered` table without a default value. This is not possible if the table is not empty.
  - Added the required column `useranswerid` to the `UserAnswered` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AnswersUserForm" DROP CONSTRAINT "AnswersUserForm_useranswerid_fkey";

-- AlterTable
ALTER TABLE "UserAnswered" ADD COLUMN     "answer" JSONB NOT NULL,
ADD COLUMN     "useranswerid" TEXT NOT NULL;

-- DropTable
DROP TABLE "AnswersUserForm";
