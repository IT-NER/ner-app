/*
  Warnings:

  - You are about to drop the `Public` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PublicUser` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Public] DROP CONSTRAINT [Public_contentId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Public] DROP CONSTRAINT [Public_userId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[PublicUser] DROP CONSTRAINT [PublicUser_PublicId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[PublicUser] DROP CONSTRAINT [PublicUser_UserId_fkey];

-- DropTable
DROP TABLE [dbo].[Public];

-- DropTable
DROP TABLE [dbo].[PublicUser];

-- CreateTable
CREATE TABLE [dbo].[ContentPublic] (
    [id] INT NOT NULL IDENTITY(1,1),
    [ticket] NVARCHAR(1000) NOT NULL,
    [start] DATETIME2,
    [end] DATETIME2,
    [timed] BIT CONSTRAINT [ContentPublic_timed_df] DEFAULT 1,
    [remark] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [ContentPublic_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [active] BIT CONSTRAINT [ContentPublic_active_df] DEFAULT 1,
    [publish] BIT CONSTRAINT [ContentPublic_publish_df] DEFAULT 0,
    [contentId] INT,
    [userId] INT,
    CONSTRAINT [ContentPublic_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [ContentPublic_ticket_key] UNIQUE NONCLUSTERED ([ticket])
);

-- CreateTable
CREATE TABLE [dbo].[ContentPublicUser] (
    [ContentPublicId] INT NOT NULL,
    [UserId] INT NOT NULL,
    [active] BIT NOT NULL CONSTRAINT [ContentPublicUser_active_df] DEFAULT 0,
    CONSTRAINT [ContentPublicUser_pkey] PRIMARY KEY CLUSTERED ([ContentPublicId],[UserId])
);

-- AddForeignKey
ALTER TABLE [dbo].[ContentPublic] ADD CONSTRAINT [ContentPublic_contentId_fkey] FOREIGN KEY ([contentId]) REFERENCES [dbo].[Content]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ContentPublic] ADD CONSTRAINT [ContentPublic_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ContentPublicUser] ADD CONSTRAINT [ContentPublicUser_ContentPublicId_fkey] FOREIGN KEY ([ContentPublicId]) REFERENCES [dbo].[ContentPublic]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ContentPublicUser] ADD CONSTRAINT [ContentPublicUser_UserId_fkey] FOREIGN KEY ([UserId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
