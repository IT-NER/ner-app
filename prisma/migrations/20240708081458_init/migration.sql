/*
  Warnings:

  - You are about to drop the column `UserPhoneNumber` on the `Booking` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Booking] DROP COLUMN [UserPhoneNumber];
ALTER TABLE [dbo].[Booking] ADD [UserPhoneNumber] NVARCHAR(250);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
