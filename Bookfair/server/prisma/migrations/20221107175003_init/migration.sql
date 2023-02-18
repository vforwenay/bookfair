/*
  Warnings:

  - Made the column `name` on table `Buyer` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Buyer" DROP CONSTRAINT "Buyer_cartId_fkey";

-- AlterTable
ALTER TABLE "Buyer" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "cartId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "_BuyerToCart" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BuyerToCart_AB_unique" ON "_BuyerToCart"("A", "B");

-- CreateIndex
CREATE INDEX "_BuyerToCart_B_index" ON "_BuyerToCart"("B");

-- AddForeignKey
ALTER TABLE "_BuyerToCart" ADD CONSTRAINT "_BuyerToCart_A_fkey" FOREIGN KEY ("A") REFERENCES "Buyer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BuyerToCart" ADD CONSTRAINT "_BuyerToCart_B_fkey" FOREIGN KEY ("B") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;
