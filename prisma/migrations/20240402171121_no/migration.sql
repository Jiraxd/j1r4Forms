/*
  Warnings:

  - The primary key for the `FormAnswer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `FormAnswer` table. All the data in the column will be lost.
  - You are about to drop the column `savedFormFormid` on the `FormField` table. All the data in the column will be lost.
  - Added the required column `formdescription` to the `SavedForm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `formtitle` to the `SavedForm` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FormField" DROP CONSTRAINT "FormField_savedFormFormid_fkey";

-- AlterTable
ALTER TABLE "FormAnswer" DROP CONSTRAINT "FormAnswer_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "FormAnswer_pkey" PRIMARY KEY ("fieldid");

-- AlterTable
ALTER TABLE "FormField" DROP COLUMN "savedFormFormid";

-- AlterTable
ALTER TABLE "SavedForm" ADD COLUMN     "formdescription" TEXT NOT NULL,
ADD COLUMN     "formtitle" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "FormField" ADD CONSTRAINT "FormField_formid_fkey" FOREIGN KEY ("formid") REFERENCES "SavedForm"("formid") ON DELETE RESTRICT ON UPDATE CASCADE;
