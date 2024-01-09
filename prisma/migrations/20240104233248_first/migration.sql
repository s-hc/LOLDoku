/*
  Warnings:

  - You are about to drop the column `image` on the `Champion` table. All the data in the column will be lost.
  - You are about to drop the column `tag1Id` on the `Champion` table. All the data in the column will be lost.
  - You are about to drop the column `tag2Id` on the `Champion` table. All the data in the column will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `uri` to the `Champion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `xOffset` to the `Champion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yOffset` to the `Champion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Champion" DROP CONSTRAINT "Champion_tag1Id_fkey";

-- DropForeignKey
ALTER TABLE "Champion" DROP CONSTRAINT "Champion_tag2Id_fkey";

-- AlterTable
ALTER TABLE "Champion" DROP COLUMN "image",
DROP COLUMN "tag1Id",
DROP COLUMN "tag2Id",
ADD COLUMN     "uri" TEXT NOT NULL,
ADD COLUMN     "xOffset" INTEGER NOT NULL,
ADD COLUMN     "yOffset" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "tag" TEXT NOT NULL,
    "champ" INTEGER NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_champ_fkey" FOREIGN KEY ("champ") REFERENCES "Champion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
