/*
  Warnings:

  - A unique constraint covering the columns `[ticket]` on the table `Public` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ticket` to the `Public` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Public] ADD [ticket] NVARCHAR(1000) NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[Public] ADD CONSTRAINT [Public_ticket_key] UNIQUE NONCLUSTERED ([ticket]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
