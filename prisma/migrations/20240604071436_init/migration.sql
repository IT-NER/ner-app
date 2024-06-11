/*
  Warnings:

  - You are about to drop the column `RoomColorId` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the `RoomColor` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Room] DROP CONSTRAINT [Room_RoomColorId_fkey];

-- AlterTable
ALTER TABLE [dbo].[Room] DROP COLUMN [RoomColorId];

-- DropTable
DROP TABLE [dbo].[RoomColor];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
