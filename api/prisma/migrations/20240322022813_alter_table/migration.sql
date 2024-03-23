/*
  Warnings:

  - You are about to drop the column `time_only` on the `classes` table. All the data in the column will be lost.
  - Added the required column `begin_time_only` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_time_only` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `students_limit` to the `classes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "classes" DROP COLUMN "time_only",
ADD COLUMN     "begin_time_only" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "end_time_only" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "students_limit" INTEGER NOT NULL;
