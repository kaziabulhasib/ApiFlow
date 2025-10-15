/*
  Warnings:

  - A unique constraint covering the columns `[OwnerId,name]` on the table `Workspace` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Workspace_OwnerId_name_key" ON "Workspace"("OwnerId", "name");
