/*
  Warnings:

  - You are about to drop the `Activity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ActivityImg` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[ActivityImg] DROP CONSTRAINT [ActivityImg_activityId_fkey];

-- AlterTable
ALTER TABLE [dbo].[Booking] ADD CONSTRAINT [Booking_timed_df] DEFAULT 1 FOR [timed];

-- DropTable
DROP TABLE [dbo].[Activity];

-- DropTable
DROP TABLE [dbo].[ActivityImg];

-- CreateTable
CREATE TABLE [dbo].[Content] (
    [id] INT NOT NULL IDENTITY(1,1),
    [ticket] INT NOT NULL,
    [code] INT NOT NULL,
    [start] DATETIME2,
    [end] DATETIME2,
    [timed] BIT CONSTRAINT [Content_timed_df] DEFAULT 1,
    [title] NVARCHAR(1000),
    [description] NVARCHAR(1000),
    [detail] NVARCHAR(1000),
    [point] INT CONSTRAINT [Content_point_df] DEFAULT 0,
    [show] BIT CONSTRAINT [Content_show_df] DEFAULT 0,
    [userId] INT,
    [contentTypeId] INT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Content_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [active] BIT CONSTRAINT [Content_active_df] DEFAULT 1,
    CONSTRAINT [Content_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Content_ticket_key] UNIQUE NONCLUSTERED ([ticket]),
    CONSTRAINT [Content_code_key] UNIQUE NONCLUSTERED ([code])
);

-- CreateTable
CREATE TABLE [dbo].[ContentType] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [ContentType_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [active] BIT CONSTRAINT [ContentType_active_df] DEFAULT 1,
    CONSTRAINT [ContentType_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [ContentType_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[ContentImg] (
    [id] INT NOT NULL IDENTITY(1,1),
    [path] NVARCHAR(1000),
    [name] NVARCHAR(1000),
    [contentId] INT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [ContentImg_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [active] BIT CONSTRAINT [ContentImg_active_df] DEFAULT 1,
    CONSTRAINT [ContentImg_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PointReceived] (
    [id] INT NOT NULL IDENTITY(1,1),
    [ticket] INT NOT NULL,
    [point] INT CONSTRAINT [PointReceived_point_df] DEFAULT 0,
    [contentId] INT,
    [userId] INT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [PointReceived_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [active] BIT CONSTRAINT [PointReceived_active_df] DEFAULT 1,
    CONSTRAINT [PointReceived_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [PointReceived_ticket_key] UNIQUE NONCLUSTERED ([ticket])
);

-- CreateTable
CREATE TABLE [dbo].[PointPay] (
    [id] INT NOT NULL IDENTITY(1,1),
    [ticket] INT NOT NULL,
    [point] INT CONSTRAINT [PointPay_point_df] DEFAULT 0,
    [approve] BIT CONSTRAINT [PointPay_approve_df] DEFAULT 0,
    [userId] INT,
    [contentId] INT,
    [rewardId] INT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [PointPay_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [active] BIT CONSTRAINT [PointPay_active_df] DEFAULT 1,
    CONSTRAINT [PointPay_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [PointPay_ticket_key] UNIQUE NONCLUSTERED ([ticket])
);

-- CreateTable
CREATE TABLE [dbo].[PointReceivedPay] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] INT,
    [pointReceivedId] INT,
    [pointPayId] INT,
    [rewardId] INT,
    CONSTRAINT [PointReceivedPay_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Reward] (
    [id] INT NOT NULL IDENTITY(1,1),
    [ticket] INT NOT NULL,
    [name] NVARCHAR(1000),
    [description] NVARCHAR(1000),
    [point] INT CONSTRAINT [Reward_point_df] DEFAULT 0,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Reward_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [active] BIT CONSTRAINT [Reward_active_df] DEFAULT 1,
    CONSTRAINT [Reward_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Reward_ticket_key] UNIQUE NONCLUSTERED ([ticket])
);

-- CreateTable
CREATE TABLE [dbo].[RewardImg] (
    [id] INT NOT NULL IDENTITY(1,1),
    [path] NVARCHAR(1000),
    [name] NVARCHAR(1000),
    [rewardId] INT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [RewardImg_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [active] BIT CONSTRAINT [RewardImg_active_df] DEFAULT 1,
    CONSTRAINT [RewardImg_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Content] ADD CONSTRAINT [Content_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Content] ADD CONSTRAINT [Content_contentTypeId_fkey] FOREIGN KEY ([contentTypeId]) REFERENCES [dbo].[ContentType]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ContentImg] ADD CONSTRAINT [ContentImg_contentId_fkey] FOREIGN KEY ([contentId]) REFERENCES [dbo].[Content]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PointReceived] ADD CONSTRAINT [PointReceived_contentId_fkey] FOREIGN KEY ([contentId]) REFERENCES [dbo].[Content]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PointReceived] ADD CONSTRAINT [PointReceived_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PointPay] ADD CONSTRAINT [PointPay_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PointPay] ADD CONSTRAINT [PointPay_contentId_fkey] FOREIGN KEY ([contentId]) REFERENCES [dbo].[Content]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PointPay] ADD CONSTRAINT [PointPay_rewardId_fkey] FOREIGN KEY ([rewardId]) REFERENCES [dbo].[Reward]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PointReceivedPay] ADD CONSTRAINT [PointReceivedPay_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PointReceivedPay] ADD CONSTRAINT [PointReceivedPay_pointReceivedId_fkey] FOREIGN KEY ([pointReceivedId]) REFERENCES [dbo].[PointReceived]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PointReceivedPay] ADD CONSTRAINT [PointReceivedPay_pointPayId_fkey] FOREIGN KEY ([pointPayId]) REFERENCES [dbo].[PointPay]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PointReceivedPay] ADD CONSTRAINT [PointReceivedPay_rewardId_fkey] FOREIGN KEY ([rewardId]) REFERENCES [dbo].[Reward]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
