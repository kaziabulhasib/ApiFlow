/*
  Warnings:

  - You are about to drop the column `OwnerId` on the `Workspace` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ownerId,name]` on the table `Workspace` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownerId` to the `Workspace` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Workspace" DROP CONSTRAINT "Workspace_OwnerId_fkey";

-- DropIndex
DROP INDEX "public"."Workspace_OwnerId_name_key";

-- AlterTable
ALTER TABLE "Workspace" DROP COLUMN "OwnerId",
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Workspace_ownerId_name_key" ON "Workspace"("ownerId", "name");

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
