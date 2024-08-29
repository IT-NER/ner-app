/*
  Warnings:

  - You are about to drop the column `ticket` on the `ButtonLink` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `ButtonLink` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `ButtonLink` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[ButtonLink] DROP CONSTRAINT [ButtonLink_ticket_key];

-- DropIndex
ALTER TABLE [dbo].[ButtonLink] DROP CONSTRAINT [ButtonLink_url_key];

-- AlterTable
ALTER TABLE [dbo].[ButtonLink] ALTER COLUMN [url] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[ButtonLink] DROP COLUMN [ticket];
ALTER TABLE [dbo].[ButtonLink] ADD [name] NVARCHAR(1000) NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[ButtonLink] ADD CONSTRAINT [ButtonLink_name_key] UNIQUE NONCLUSTERED ([name]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
