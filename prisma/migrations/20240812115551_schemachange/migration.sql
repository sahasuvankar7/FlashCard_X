/*
  Warnings:

  - You are about to drop the column `answerId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `cardId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the `Answer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Card` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `answer` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_answerId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_cardId_fkey";

-- DropIndex
DROP INDEX "Question_answerId_key";

-- DropIndex
DROP INDEX "Question_cardId_key";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "answerId",
DROP COLUMN "cardId",
ADD COLUMN     "answer" TEXT NOT NULL,
ADD COLUMN     "answers" TEXT[],
ALTER COLUMN "desc" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "Answer";

-- DropTable
DROP TABLE "Card";
