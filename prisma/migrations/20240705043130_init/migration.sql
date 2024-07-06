/*
  Warnings:

  - You are about to drop the column `contentStatusId` on the `ContentView` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[ContentView] DROP CONSTRAINT [ContentView_contentStatusId_fkey];

-- AlterTable
ALTER TABLE [dbo].[Content] ADD [contentStatusId] INT;

-- AlterTable
ALTER TABLE [dbo].[ContentView] DROP COLUMN [contentStatusId];

-- AddForeignKey
ALTER TABLE [dbo].[Content] ADD CONSTRAINT [Content_contentStatusId_fkey] FOREIGN KEY ([contentStatusId]) REFERENCES [dbo].[ContentStatus]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
