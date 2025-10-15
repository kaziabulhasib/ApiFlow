/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Workspace` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,workspaceId]` on the table `WorkspaceMember` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `OwnerId` to the `Workspace` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Workspace" DROP CONSTRAINT "Workspace_ownerId_fkey";

-- DropIndex
DROP INDEX "public"."Workspace_name_ownerId_key";

-- AlterTable
ALTER TABLE "Workspace" DROP COLUMN "ownerId",
ADD COLUMN     "OwnerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "WorkspaceMember_userId_workspaceId_key" ON "WorkspaceMember"("userId", "workspaceId");

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_OwnerId_fkey" FOREIGN KEY ("OwnerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
