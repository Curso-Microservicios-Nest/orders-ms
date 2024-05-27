/*
  Warnings:

  - You are about to drop the `orders_items` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "orders_items" DROP CONSTRAINT "orders_items_orderId_fkey";

-- DropTable
DROP TABLE "orders_items";

-- CreateTable
CREATE TABLE "orders_has_items" (
    "id" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "order_id" TEXT,

    CONSTRAINT "orders_has_items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orders_has_items" ADD CONSTRAINT "orders_has_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
