BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[RewardImg] ADD [url] NVARCHAR(1000);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
