/*
  Warnings:

  - You are about to drop the column `cvUrl` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `githubUrl` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `linkedinUrl` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the `websitesettings` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `backgroundGradient` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `education` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experience` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileImage` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `profile` DROP COLUMN `cvUrl`,
    DROP COLUMN `email`,
    DROP COLUMN `githubUrl`,
    DROP COLUMN `imageUrl`,
    DROP COLUMN `isActive`,
    DROP COLUMN `linkedinUrl`,
    ADD COLUMN `backgroundGradient` VARCHAR(191) NOT NULL,
    ADD COLUMN `education` VARCHAR(191) NOT NULL,
    ADD COLUMN `experience` VARCHAR(191) NOT NULL,
    ADD COLUMN `profileImage` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'Selamat Datang di SMK Telkom Makassar',
    MODIFY `description` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `websitesettings`;
