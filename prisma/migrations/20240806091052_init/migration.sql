BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Content] ADD [contentCoverImgId] INT;

-- CreateTable
CREATE TABLE [dbo].[ContentCoverImg] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [ContentCoverImg_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [ContentCoverImg_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [ContentCoverImg_name_key] UNIQUE NONCLUSTERED ([name])
);

-- AddForeignKey
ALTER TABLE [dbo].[Content] ADD CONSTRAINT [Content_contentCoverImgId_fkey] FOREIGN KEY ([contentCoverImgId]) REFERENCES [dbo].[ContentCoverImg]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
