-- AlterTable
ALTER TABLE `AgenceOp` ADD COLUMN `pointid` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `AgenceOp` ADD CONSTRAINT `AgenceOp_pointid_fkey` FOREIGN KEY (`pointid`) REFERENCES `Point`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
