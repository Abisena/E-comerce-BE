-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'User', 'Penjual');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'Admin';
