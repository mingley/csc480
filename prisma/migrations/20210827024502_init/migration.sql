/*
  Warnings:

  - You are about to drop the column `assigneeId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `_ProjectToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_assigneeId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_projectId_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToUser" DROP CONSTRAINT "_ProjectToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToUser" DROP CONSTRAINT "_ProjectToUser_B_fkey";

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "description" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "assigneeId",
DROP COLUMN "projectId";

-- DropTable
DROP TABLE "_ProjectToUser";
