-- CreateEnum
CREATE TYPE "REST_METHOD" AS ENUM ('GET', 'POST', 'PUT', 'PATCH', 'DELETE');

-- CreateTable
CREATE TABLE "request" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "method" "REST_METHOD" NOT NULL DEFAULT 'GET',
    "url" TEXT NOT NULL,
    "parameters" JSONB,
    "headers" JSONB,
    "body" JSONB,
    "response" JSONB,
    "collectionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "request_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "request" ADD CONSTRAINT "request_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
