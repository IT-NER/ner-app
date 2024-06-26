BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[Content] DROP CONSTRAINT [Content_code_key];

-- DropIndex
ALTER TABLE [dbo].[Content] DROP CONSTRAINT [Content_ticket_key];

-- DropIndex
ALTER TABLE [dbo].[PointPay] DROP CONSTRAINT [PointPay_ticket_key];

-- DropIndex
ALTER TABLE [dbo].[PointReceived] DROP CONSTRAINT [PointReceived_ticket_key];

-- DropIndex
ALTER TABLE [dbo].[Reward] DROP CONSTRAINT [Reward_ticket_key];

-- AlterTable
ALTER TABLE [dbo].[Content] ALTER COLUMN [ticket] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[Content] ALTER COLUMN [code] NVARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[PointPay] ALTER COLUMN [ticket] NVARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[PointReceived] ALTER COLUMN [ticket] NVARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[Reward] ALTER COLUMN [ticket] NVARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[User] ADD [buttonLinkId] INT;

-- CreateTable
CREATE TABLE [dbo].[ButtonLink] (
    [id] INT NOT NULL IDENTITY(1,1),
    [ticket] NVARCHAR(1000) NOT NULL,
    [remark] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [ButtonLink_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [active] BIT CONSTRAINT [ButtonLink_active_df] DEFAULT 1,
    CONSTRAINT [ButtonLink_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [ButtonLink_ticket_key] UNIQUE NONCLUSTERED ([ticket])
);

-- CreateIndex
ALTER TABLE [dbo].[Content] ADD CONSTRAINT [Content_ticket_key] UNIQUE NONCLUSTERED ([ticket]);

-- CreateIndex
ALTER TABLE [dbo].[Content] ADD CONSTRAINT [Content_code_key] UNIQUE NONCLUSTERED ([code]);

-- CreateIndex
ALTER TABLE [dbo].[PointReceived] ADD CONSTRAINT [PointReceived_ticket_key] UNIQUE NONCLUSTERED ([ticket]);

-- CreateIndex
ALTER TABLE [dbo].[PointPay] ADD CONSTRAINT [PointPay_ticket_key] UNIQUE NONCLUSTERED ([ticket]);

-- CreateIndex
ALTER TABLE [dbo].[Reward] ADD CONSTRAINT [Reward_ticket_key] UNIQUE NONCLUSTERED ([ticket]);

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_buttonLinkId_fkey] FOREIGN KEY ([buttonLinkId]) REFERENCES [dbo].[ButtonLink]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
