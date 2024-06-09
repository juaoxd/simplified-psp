-- CreateTable
CREATE TABLE "payables" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "gross_amount" DECIMAL(10,2) NOT NULL,
    "net_amount" DECIMAL(10,2) NOT NULL,
    "payment_date" TIMESTAMP(3) NOT NULL,
    "transactionId" TEXT NOT NULL,

    CONSTRAINT "payables_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "payables" ADD CONSTRAINT "payables_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
