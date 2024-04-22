/*
  Warnings:

  - You are about to drop the column `edad` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `Pet` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Pet` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `age` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `species` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Pet_nombre_key";

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "edad",
DROP COLUMN "nombre",
DROP COLUMN "tipo",
ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "species" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Pet_name_key" ON "Pet"("name");
