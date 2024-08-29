BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Car] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [req_name] NVARCHAR(1000),
    [reg_txt] NVARCHAR(1000),
    [reg_no] INT,
    [mileage] INT,
    [active] BIT CONSTRAINT [Car_active_df] DEFAULT 1,
    [remark] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Car_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [carTypeId] INT,
    [carBrandId] INT,
    [carModelId] INT,
    [provinceId] INT,
    CONSTRAINT [Car_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Car_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[CarType] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [active] BIT CONSTRAINT [CarType_active_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [CarType_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [CarType_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [CarType_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[CarBrand] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [active] BIT CONSTRAINT [CarBrand_active_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [CarBrand_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [CarBrand_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [CarBrand_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[CarModel] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [active] BIT CONSTRAINT [CarModel_active_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [CarModel_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [carBrandId] INT,
    CONSTRAINT [CarModel_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [CarModel_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[Province] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [active] BIT CONSTRAINT [Province_active_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Province_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Province_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Province_name_key] UNIQUE NONCLUSTERED ([name])
);

-- AddForeignKey
ALTER TABLE [dbo].[Car] ADD CONSTRAINT [Car_carTypeId_fkey] FOREIGN KEY ([carTypeId]) REFERENCES [dbo].[CarType]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Car] ADD CONSTRAINT [Car_carBrandId_fkey] FOREIGN KEY ([carBrandId]) REFERENCES [dbo].[CarBrand]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Car] ADD CONSTRAINT [Car_carModelId_fkey] FOREIGN KEY ([carModelId]) REFERENCES [dbo].[CarModel]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Car] ADD CONSTRAINT [Car_provinceId_fkey] FOREIGN KEY ([provinceId]) REFERENCES [dbo].[Province]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[CarModel] ADD CONSTRAINT [CarModel_carBrandId_fkey] FOREIGN KEY ([carBrandId]) REFERENCES [dbo].[CarBrand]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
