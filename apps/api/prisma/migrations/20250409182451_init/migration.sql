/*
  Warnings:

  - You are about to drop the column `pointid` on the `AgenceOp` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `AgenceOp` DROP FOREIGN KEY `AgenceOp_pointid_fkey`;

-- DropIndex
DROP INDEX `AgenceOp_pointid_fkey` ON `AgenceOp`;

-- AlterTable
ALTER TABLE `AgenceOp` DROP COLUMN `pointid`,
    ADD COLUMN `pointId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `AgenceOp` ADD CONSTRAINT `AgenceOp_pointId_fkey` FOREIGN KEY (`pointId`) REFERENCES `Point`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
