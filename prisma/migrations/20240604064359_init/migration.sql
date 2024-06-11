/*
  Warnings:

  - You are about to drop the column `code` on the `Room` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Room] DROP COLUMN [code];
ALTER TABLE [dbo].[Room] ADD [color] NVARCHAR(1000);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
