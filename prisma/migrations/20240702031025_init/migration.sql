/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `ButtonLink` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `url` to the `ButtonLink` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[ButtonLink] ADD [url] NVARCHAR(1000) NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[ButtonLink] ADD CONSTRAINT [ButtonLink_url_key] UNIQUE NONCLUSTERED ([url]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
