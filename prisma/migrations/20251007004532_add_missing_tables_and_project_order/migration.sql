/*
  Warnings:

  - You are about to drop the column `data` on the `profileimage` table. All the data in the column will be lost.
  - Added the required column `path` to the `ProfileImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `ProfileImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `profileimage` DROP COLUMN `data`,
    ADD COLUMN `path` VARCHAR(191) NOT NULL,
    ADD COLUMN `size` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `project` ADD COLUMN `order` INTEGER NULL;

-- CreateTable
CREATE TABLE `About` (
    `id` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Skill` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `order` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Experience` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NOT NULL DEFAULT 'CgWorkAlt',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
