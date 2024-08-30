/*
  Warnings:

  - You are about to drop the column `expenseSmmaryId` on the `ExpenseByCategory` table. All the data in the column will be lost.
  - Added the required column `expenseSummaryId` to the `ExpenseByCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ExpenseByCategory" DROP CONSTRAINT "ExpenseByCategory_expenseSmmaryId_fkey";

-- AlterTable
ALTER TABLE "ExpenseByCategory" DROP COLUMN "expenseSmmaryId",
ADD COLUMN     "expenseSummaryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ExpenseByCategory" ADD CONSTRAINT "ExpenseByCategory_expenseSummaryId_fkey" FOREIGN KEY ("expenseSummaryId") REFERENCES "ExpenseSummary"("expenseSummaryId") ON DELETE RESTRICT ON UPDATE CASCADE;
