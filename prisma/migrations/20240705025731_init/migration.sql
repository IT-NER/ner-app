BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[ContentView] ADD [contentStatusId] INT;

-- AddForeignKey
ALTER TABLE [dbo].[ContentView] ADD CONSTRAINT [ContentView_contentStatusId_fkey] FOREIGN KEY ([contentStatusId]) REFERENCES [dbo].[ContentStatus]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
