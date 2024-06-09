/*
  Warnings:

  - Made the column `cartId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "cartId" SET NOT NULL,
ALTER COLUMN "cartId" DROP DEFAULT;
