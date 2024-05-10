/*
  Warnings:

  - You are about to drop the column `answerIndex` on the `AnswersUserForm` table. All the data in the column will be lost.
  - You are about to drop the column `userid` on the `AnswersUserForm` table. All the data in the column will be lost.
  - You are about to drop the column `userID` on the `UserAnswered` table. All the data in the column will be lost.
  - Added the required column `useranswerid` to the `AnswersUserForm` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `answer` on the `AnswersUserForm` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "AnswersUserForm" DROP CONSTRAINT "AnswersUserForm_userid_fkey";

-- DropIndex
DROP INDEX "UserAnswered_userID_key";

-- AlterTable
ALTER TABLE "AnswersUserForm" DROP COLUMN "answerIndex",
DROP COLUMN "userid",
ADD COLUMN     "useranswerid" TEXT NOT NULL,
DROP COLUMN "answer",
ADD COLUMN     "answer" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "UserAnswered" DROP COLUMN "userID";

-- AddForeignKey
ALTER TABLE "AnswersUserForm" ADD CONSTRAINT "AnswersUserForm_useranswerid_fkey" FOREIGN KEY ("useranswerid") REFERENCES "UserAnswered"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
