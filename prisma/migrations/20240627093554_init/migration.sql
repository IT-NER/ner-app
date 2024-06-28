BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Reward] ADD [userId] INT;

-- AlterTable
ALTER TABLE [dbo].[User] ALTER COLUMN [active] BIT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[Reward] ADD CONSTRAINT [Reward_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH