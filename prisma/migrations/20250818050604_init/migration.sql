/*
  Warnings:

  - Changed the type of `level` on the `LogModel` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."SeverityLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- AlterTable
ALTER TABLE "public"."LogModel" DROP COLUMN "level",
ADD COLUMN     "level" "public"."SeverityLevel" NOT NULL;

-- DropEnum
DROP TYPE "public"."SeverityLvel";
