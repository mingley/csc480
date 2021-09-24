/*
  Warnings:

  - You are about to drop the column `created_by_id` on the `Column` table. All the data in the column will be lost.
  - Added the required column `project_id` to the `Column` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Column" DROP CONSTRAINT "Column_created_by_id_fkey";

-- AlterTable
ALTER TABLE "Column" DROP COLUMN "created_by_id",
ADD COLUMN     "project_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Column" ADD CONSTRAINT "Column_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
