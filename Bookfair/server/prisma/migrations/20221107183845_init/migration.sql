/*
  Warnings:

  - You are about to drop the column `cartId` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_cartId_fkey";

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_buyerId_fkey";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "cartId";

-- DropTable
DROP TABLE "Cart";
