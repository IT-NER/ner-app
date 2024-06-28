BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Booking] ADD [authorPhoneNumber] NVARCHAR(250);

-- AlterTable
ALTER TABLE [dbo].[ContentView] ADD [publish] BIT CONSTRAINT [ContentView_publish_df] DEFAULT 0;

-- AddForeignKey
ALTER TABLE [dbo].[RewardImg] ADD CONSTRAINT [RewardImg_rewardId_fkey] FOREIGN KEY ([rewardId]) REFERENCES [dbo].[Reward]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
