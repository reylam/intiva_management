-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_division_id_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "division_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_division_id_fkey" FOREIGN KEY ("division_id") REFERENCES "Division"("id") ON DELETE SET NULL ON UPDATE CASCADE;
