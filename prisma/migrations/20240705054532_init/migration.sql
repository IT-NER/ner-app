/*
  Warnings:

  - You are about to drop the `ContentView` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[ContentView] DROP CONSTRAINT [ContentView_contentId_fkey];

-- DropTable
DROP TABLE [dbo].[ContentView];

-- CreateTable
CREATE TABLE [dbo].[Public] (
    [id] INT NOT NULL IDENTITY(1,1),
    [start] DATETIME2,
    [end] DATETIME2,
    [timed] BIT CONSTRAINT [Public_timed_df] DEFAULT 1,
    [name] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Public_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [active] BIT CONSTRAINT [Public_active_df] DEFAULT 1,
    [publish] BIT CONSTRAINT [Public_publish_df] DEFAULT 0,
    [contentId] INT,
    CONSTRAINT [Public_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Public] ADD CONSTRAINT [Public_contentId_fkey] FOREIGN KEY ([contentId]) REFERENCES [dbo].[Content]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
