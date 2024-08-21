/*
  Warnings:

  - You are about to drop the column `pointPayRequestId` on the `PointPay` table. All the data in the column will be lost.
  - You are about to drop the `PointPayRequest` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[PointPay] DROP CONSTRAINT [PointPay_pointPayRequestId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[PointPayRequest] DROP CONSTRAINT [PointPayRequest_rewardId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[PointPayRequest] DROP CONSTRAINT [PointPayRequest_userId_fkey];

-- AlterTable
ALTER TABLE [dbo].[PointPay] DROP COLUMN [pointPayRequestId];
ALTER TABLE [dbo].[PointPay] ADD [approveBy] INT,
[approveDate] DATETIME2,
[pointPayStatusId] INT,
[status] NVARCHAR(1000);

-- DropTable
DROP TABLE [dbo].[PointPayRequest];

-- CreateTable
CREATE TABLE [dbo].[PointPayStatus] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [PointPayStatus_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [PointPayStatus_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[PointPay] ADD CONSTRAINT [PointPay_pointPayStatusId_fkey] FOREIGN KEY ([pointPayStatusId]) REFERENCES [dbo].[PointPayStatus]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
