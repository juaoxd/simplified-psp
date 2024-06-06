-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "description" TEXT NOT NULL,
    "payment_method" TEXT NOT NULL,
    "card_number" TEXT NOT NULL,
    "card_holder_name" TEXT NOT NULL,
    "card_expiration_date" TEXT NOT NULL,
    "card_cvv" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);
