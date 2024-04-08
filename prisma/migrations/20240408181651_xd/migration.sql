/*
  Warnings:

  - The primary key for the `FormAnswer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `fieldid` on the `FormAnswer` table. All the data in the column will be lost.
  - Added the required column `fieldID` to the `FormAnswer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `FormField` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FormAnswer" DROP CONSTRAINT "FormAnswer_fieldid_fkey";

-- AlterTable
ALTER TABLE "FormAnswer" DROP CONSTRAINT "FormAnswer_pkey",
DROP COLUMN "fieldid",
ADD COLUMN     "fieldID" INTEGER NOT NULL,
ADD CONSTRAINT "FormAnswer_pkey" PRIMARY KEY ("fieldID");

-- AlterTable
ALTER TABLE "FormField" ADD COLUMN     "position" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "FormAnswer" ADD CONSTRAINT "FormAnswer_fieldID_fkey" FOREIGN KEY ("fieldID") REFERENCES "FormField"("fieldID") ON DELETE RESTRICT ON UPDATE CASCADE;
