-- CreateEnum
CREATE TYPE "public"."SeverityLvel" AS ENUM ('LOW', 'MWDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "public"."LogModel" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "level" "public"."SeverityLvel" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogModel_pkey" PRIMARY KEY ("id")
);
