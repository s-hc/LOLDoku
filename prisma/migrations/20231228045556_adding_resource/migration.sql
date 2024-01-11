/*
  Warnings:

  - Added the required column `resource` to the `Champion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Champion" ADD COLUMN     "resource" TEXT NOT NULL;
