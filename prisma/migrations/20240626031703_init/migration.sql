BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[PointReceivedPay] ADD [date] DATETIME2,
[pointPay] INT,
[pointReceived] INT,
[pointTotal] INT,
[ticketPay] NVARCHAR(1000),
[ticketReceived] NVARCHAR(1000);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
