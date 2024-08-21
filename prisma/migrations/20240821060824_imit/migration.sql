/*
  Warnings:

  - You are about to alter the column `description` on the `Reward` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `VarChar(8000)`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Reward] ALTER COLUMN [description] VARCHAR(8000) NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
