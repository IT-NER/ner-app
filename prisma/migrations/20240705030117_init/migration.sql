BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[ContentView] ADD [contentId] INT;

-- AddForeignKey
ALTER TABLE [dbo].[ContentView] ADD CONSTRAINT [ContentView_contentId_fkey] FOREIGN KEY ([contentId]) REFERENCES [dbo].[Content]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
