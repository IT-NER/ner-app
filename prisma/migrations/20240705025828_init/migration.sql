/*
  Warnings:

  - You are about to drop the column `contentStatusId` on the `Content` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Content] DROP CONSTRAINT [Content_contentStatusId_fkey];

-- AlterTable
ALTER TABLE [dbo].[Content] DROP COLUMN [contentStatusId];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
