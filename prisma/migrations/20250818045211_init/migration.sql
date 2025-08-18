/*
  Warnings:

  - The values [MWDIUM] on the enum `SeverityLvel` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."SeverityLvel_new" AS ENUM ('LOW', 'MEDIUM', 'HIGH');
ALTER TABLE "public"."LogModel" ALTER COLUMN "level" TYPE "public"."SeverityLvel_new" USING ("level"::text::"public"."SeverityLvel_new");
ALTER TYPE "public"."SeverityLvel" RENAME TO "SeverityLvel_old";
ALTER TYPE "public"."SeverityLvel_new" RENAME TO "SeverityLvel";
DROP TYPE "public"."SeverityLvel_old";
COMMIT;
