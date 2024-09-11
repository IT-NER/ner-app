/*
  Warnings:

  - You are about to drop the column `reg_no` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `reg_txt` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `req_name` on the `Car` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Car] DROP COLUMN [reg_no],
[reg_txt],
[req_name];
ALTER TABLE [dbo].[Car] ADD [carColorId] INT,
[img] NVARCHAR(1000),
[qty] INT,
[reg] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[User] ALTER COLUMN [email] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[User] ALTER COLUMN [username] NVARCHAR(1000) NULL;

-- CreateTable
CREATE TABLE [dbo].[CarImg] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000),
    [url] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [CarImg_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [carId] INT,
    CONSTRAINT [CarImg_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[CarColor] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [active] BIT CONSTRAINT [CarColor_active_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [CarColor_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [CarColor_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [CarColor_name_key] UNIQUE NONCLUSTERED ([name])
);

-- AddForeignKey
ALTER TABLE [dbo].[Car] ADD CONSTRAINT [Car_carColorId_fkey] FOREIGN KEY ([carColorId]) REFERENCES [dbo].[CarColor]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CarImg] ADD CONSTRAINT [CarImg_carId_fkey] FOREIGN KEY ([carId]) REFERENCES [dbo].[Car]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
