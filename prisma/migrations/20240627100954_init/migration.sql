BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[PointPay] DROP CONSTRAINT [PointPay_rewardId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[PointReceivedPay] DROP CONSTRAINT [PointReceivedPay_rewardId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[RewardImg] DROP CONSTRAINT [RewardImg_rewardId_fkey];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
