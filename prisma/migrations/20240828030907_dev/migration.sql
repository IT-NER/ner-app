/*
  Warnings:

  - You are about to drop the column `status` on the `PointPay` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[PointPay] DROP CONSTRAINT [PointPay_userId_fkey];

-- AlterTable
ALTER TABLE [dbo].[PointPay] DROP COLUMN [status];

-- AddForeignKey
ALTER TABLE [dbo].[PointPay] ADD CONSTRAINT [PointPay_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
