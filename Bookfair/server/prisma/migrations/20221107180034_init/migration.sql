/*
  Warnings:

  - You are about to drop the `_BuyerToCart` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `buyerId` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_cartId_fkey";

-- DropForeignKey
ALTER TABLE "_BuyerToCart" DROP CONSTRAINT "_BuyerToCart_A_fkey";

-- DropForeignKey
ALTER TABLE "_BuyerToCart" DROP CONSTRAINT "_BuyerToCart_B_fkey";

-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "cartId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "buyerId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_BuyerToCart";

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "Buyer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
