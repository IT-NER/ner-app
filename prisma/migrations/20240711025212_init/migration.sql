BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[ContentImg] DROP CONSTRAINT [ContentImg_contentId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[ContentPublic] DROP CONSTRAINT [ContentPublic_contentId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[ContentPublic] DROP CONSTRAINT [ContentPublic_userId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[PointPay] DROP CONSTRAINT [PointPay_pointPayRequestId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[PointPay] DROP CONSTRAINT [PointPay_rewardId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[PointReceivedPay] DROP CONSTRAINT [PointReceivedPay_userId_fkey];

-- AddForeignKey
ALTER TABLE [dbo].[ContentPublic] ADD CONSTRAINT [ContentPublic_contentId_fkey] FOREIGN KEY ([contentId]) REFERENCES [dbo].[Content]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ContentPublic] ADD CONSTRAINT [ContentPublic_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ContentImg] ADD CONSTRAINT [ContentImg_contentId_fkey] FOREIGN KEY ([contentId]) REFERENCES [dbo].[Content]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PointPay] ADD CONSTRAINT [PointPay_rewardId_fkey] FOREIGN KEY ([rewardId]) REFERENCES [dbo].[Reward]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PointPay] ADD CONSTRAINT [PointPay_pointPayRequestId_fkey] FOREIGN KEY ([pointPayRequestId]) REFERENCES [dbo].[PointPayRequest]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PointReceivedPay] ADD CONSTRAINT [PointReceivedPay_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
