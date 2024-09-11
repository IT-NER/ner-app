BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [email] NVARCHAR(1000) NOT NULL,
    [username] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000),
    [lname] NVARCHAR(1000),
    [fname] NVARCHAR(1000),
    [active] BIT CONSTRAINT [User_active_df] DEFAULT 1,
    [point] INT CONSTRAINT [User_point_df] DEFAULT 0,
    [img] NVARCHAR(1000),
    [buttonLinkId] INT,
    [departmentId] INT,
    [positionId] INT,
    [roleId] INT CONSTRAINT [User_roleId_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email]),
    CONSTRAINT [User_username_key] UNIQUE NONCLUSTERED ([username])
);

-- CreateTable
CREATE TABLE [dbo].[Car] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [reg] NVARCHAR(1000),
    [qty] INT,
    [mileage] INT,
    [active] BIT CONSTRAINT [Car_active_df] DEFAULT 1,
    [remark] NVARCHAR(1000),
    [img] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Car_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [carTypeId] INT,
    [carBrandId] INT,
    [carModelId] INT,
    [provinceId] INT,
    [carColorId] INT,
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

-- CreateTable
CREATE TABLE [dbo].[Content] (
    [id] INT NOT NULL IDENTITY(1,1),
    [start] DATETIME2,
    [end] DATETIME2,
    [timed] BIT NOT NULL CONSTRAINT [Content_timed_df] DEFAULT 1,
    [publish] BIT NOT NULL CONSTRAINT [Content_publish_df] DEFAULT 0,
    [ticket] NVARCHAR(1000) NOT NULL,
    [code] NVARCHAR(1000),
    [title] NVARCHAR(1000),
    [description] NVARCHAR(1000),
    [detail] VARCHAR(8000),
    [point] INT CONSTRAINT [Content_point_df] DEFAULT 0,
    [contentStatusId] INT,
    [contentTypeId] INT,
    [userId] INT,
    [contentCoverImgId] INT,
    [active] BIT CONSTRAINT [Content_active_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Content_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Content_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Content_ticket_key] UNIQUE NONCLUSTERED ([ticket])
);

-- CreateTable
CREATE TABLE [dbo].[ContentStatus] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000),
    [active] BIT CONSTRAINT [ContentStatus_active_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [ContentStatus_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [ContentStatus_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ContentType] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000),
    [active] BIT CONSTRAINT [ContentType_active_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [ContentType_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [ContentType_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [ContentType_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[ContentCoverImg] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000),
    [url] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [ContentCoverImg_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [ContentCoverImg_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [ContentCoverImg_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[ContentImg] (
    [id] INT NOT NULL IDENTITY(1,1),
    [url] NVARCHAR(1000),
    [path] NVARCHAR(1000),
    [name] NVARCHAR(1000),
    [index] BIT CONSTRAINT [ContentImg_index_df] DEFAULT 0,
    [contentId] INT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [ContentImg_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [ContentImg_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PointReceived] (
    [id] INT NOT NULL IDENTITY(1,1),
    [point] INT,
    [userId] INT,
    [contentId] INT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [PointReceived_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [PointReceived_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PointPay] (
    [id] INT NOT NULL IDENTITY(1,1),
    [point] INT,
    [userId] INT,
    [rewardId] INT,
    [approveDate] DATETIME2,
    [approveBy] INT,
    [pointPayStatusId] INT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [PointPay_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [PointPay_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PointPayStatus] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [PointPayStatus_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [PointPayStatus_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PointReceivedPay] (
    [id] INT NOT NULL IDENTITY(1,1),
    [pointPayId] INT,
    [pointReceivedId] INT,
    [userId] INT,
    [received] INT,
    [pay] INT,
    [total] INT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [PointReceivedPay_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [PointReceivedPay_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Reward] (
    [id] INT NOT NULL IDENTITY(1,1),
    [ticket] NVARCHAR(1000) NOT NULL,
    [code] NVARCHAR(1000),
    [name] NVARCHAR(1000),
    [description] VARCHAR(8000),
    [point] INT CONSTRAINT [Reward_point_df] DEFAULT 0,
    [userId] INT,
    [active] BIT CONSTRAINT [Reward_active_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Reward_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Reward_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Reward_ticket_key] UNIQUE NONCLUSTERED ([ticket])
);

-- CreateTable
CREATE TABLE [dbo].[RewardImg] (
    [id] INT NOT NULL IDENTITY(1,1),
    [url] NVARCHAR(1000),
    [path] NVARCHAR(1000),
    [name] NVARCHAR(1000),
    [index] BIT CONSTRAINT [RewardImg_index_df] DEFAULT 0,
    [rewardId] INT,
    [active] BIT CONSTRAINT [RewardImg_active_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [RewardImg_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [RewardImg_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ButtonLink] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [url] NVARCHAR(1000),
    [remark] NVARCHAR(1000),
    [active] BIT CONSTRAINT [ButtonLink_active_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [ButtonLink_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [ButtonLink_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [ButtonLink_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[Role] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000),
    CONSTRAINT [Role_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Department] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000),
    CONSTRAINT [Department_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Position] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000),
    CONSTRAINT [Position_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Booking] (
    [id] INT NOT NULL IDENTITY(1,1),
    [start] DATETIME2,
    [end] DATETIME2,
    [name] NVARCHAR(1000),
    [color] NVARCHAR(1000),
    [timed] BIT CONSTRAINT [Booking_timed_df] DEFAULT 1,
    [allDay] BIT CONSTRAINT [Booking_allDay_df] DEFAULT 0,
    [url] NVARCHAR(1000),
    [description] NVARCHAR(1000),
    [chairman] NVARCHAR(1000),
    [quantity] INT,
    [meetingId] NVARCHAR(1000),
    [meetingPassword] NVARCHAR(1000),
    [ApproveBy] INT,
    [tel] NVARCHAR(1000),
    [meetingTypeId] INT,
    [programId] INT,
    [roomId] INT,
    [statusId] INT CONSTRAINT [Booking_statusId_df] DEFAULT 1,
    [userId] INT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Booking_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Booking_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Program] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Program_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Program_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Status] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Status_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Status_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[MeetingType] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [MeetingType_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [MeetingType_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[BookingDevice] (
    [bookingId] INT NOT NULL,
    [deviceId] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [BookingDevice_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [BookingDevice_pkey] PRIMARY KEY CLUSTERED ([bookingId],[deviceId])
);

-- CreateTable
CREATE TABLE [dbo].[BookingFood] (
    [bookingId] INT NOT NULL,
    [foodId] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [BookingFood_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [BookingFood_pkey] PRIMARY KEY CLUSTERED ([bookingId],[foodId])
);

-- CreateTable
CREATE TABLE [dbo].[BookingDrink] (
    [bookingId] INT NOT NULL,
    [drinkId] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [BookingDrink_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [BookingDrink_pkey] PRIMARY KEY CLUSTERED ([bookingId],[drinkId])
);

-- CreateTable
CREATE TABLE [dbo].[Room] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000),
    [quantity] INT,
    [color] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Room_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Room_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Device] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Device_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Device_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Food] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Food_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Food_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Drink] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Drink_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Drink_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_departmentId_fkey] FOREIGN KEY ([departmentId]) REFERENCES [dbo].[Department]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_positionId_fkey] FOREIGN KEY ([positionId]) REFERENCES [dbo].[Position]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_roleId_fkey] FOREIGN KEY ([roleId]) REFERENCES [dbo].[Role]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Car] ADD CONSTRAINT [Car_carTypeId_fkey] FOREIGN KEY ([carTypeId]) REFERENCES [dbo].[CarType]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Car] ADD CONSTRAINT [Car_carBrandId_fkey] FOREIGN KEY ([carBrandId]) REFERENCES [dbo].[CarBrand]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Car] ADD CONSTRAINT [Car_carModelId_fkey] FOREIGN KEY ([carModelId]) REFERENCES [dbo].[CarModel]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Car] ADD CONSTRAINT [Car_provinceId_fkey] FOREIGN KEY ([provinceId]) REFERENCES [dbo].[Province]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Car] ADD CONSTRAINT [Car_carColorId_fkey] FOREIGN KEY ([carColorId]) REFERENCES [dbo].[CarColor]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CarImg] ADD CONSTRAINT [CarImg_carId_fkey] FOREIGN KEY ([carId]) REFERENCES [dbo].[Car]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CarModel] ADD CONSTRAINT [CarModel_carBrandId_fkey] FOREIGN KEY ([carBrandId]) REFERENCES [dbo].[CarBrand]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Content] ADD CONSTRAINT [Content_contentStatusId_fkey] FOREIGN KEY ([contentStatusId]) REFERENCES [dbo].[ContentStatus]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Content] ADD CONSTRAINT [Content_contentTypeId_fkey] FOREIGN KEY ([contentTypeId]) REFERENCES [dbo].[ContentType]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Content] ADD CONSTRAINT [Content_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Content] ADD CONSTRAINT [Content_contentCoverImgId_fkey] FOREIGN KEY ([contentCoverImgId]) REFERENCES [dbo].[ContentCoverImg]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ContentImg] ADD CONSTRAINT [ContentImg_contentId_fkey] FOREIGN KEY ([contentId]) REFERENCES [dbo].[Content]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PointReceived] ADD CONSTRAINT [PointReceived_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PointReceived] ADD CONSTRAINT [PointReceived_contentId_fkey] FOREIGN KEY ([contentId]) REFERENCES [dbo].[Content]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PointPay] ADD CONSTRAINT [PointPay_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PointPay] ADD CONSTRAINT [PointPay_rewardId_fkey] FOREIGN KEY ([rewardId]) REFERENCES [dbo].[Reward]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PointPay] ADD CONSTRAINT [PointPay_pointPayStatusId_fkey] FOREIGN KEY ([pointPayStatusId]) REFERENCES [dbo].[PointPayStatus]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PointReceivedPay] ADD CONSTRAINT [PointReceivedPay_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PointReceivedPay] ADD CONSTRAINT [PointReceivedPay_pointPayId_fkey] FOREIGN KEY ([pointPayId]) REFERENCES [dbo].[PointPay]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PointReceivedPay] ADD CONSTRAINT [PointReceivedPay_pointReceivedId_fkey] FOREIGN KEY ([pointReceivedId]) REFERENCES [dbo].[PointReceived]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Reward] ADD CONSTRAINT [Reward_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RewardImg] ADD CONSTRAINT [RewardImg_rewardId_fkey] FOREIGN KEY ([rewardId]) REFERENCES [dbo].[Reward]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Booking] ADD CONSTRAINT [Booking_meetingTypeId_fkey] FOREIGN KEY ([meetingTypeId]) REFERENCES [dbo].[MeetingType]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Booking] ADD CONSTRAINT [Booking_programId_fkey] FOREIGN KEY ([programId]) REFERENCES [dbo].[Program]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Booking] ADD CONSTRAINT [Booking_roomId_fkey] FOREIGN KEY ([roomId]) REFERENCES [dbo].[Room]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Booking] ADD CONSTRAINT [Booking_statusId_fkey] FOREIGN KEY ([statusId]) REFERENCES [dbo].[Status]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Booking] ADD CONSTRAINT [Booking_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[BookingDevice] ADD CONSTRAINT [BookingDevice_bookingId_fkey] FOREIGN KEY ([bookingId]) REFERENCES [dbo].[Booking]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[BookingDevice] ADD CONSTRAINT [BookingDevice_deviceId_fkey] FOREIGN KEY ([deviceId]) REFERENCES [dbo].[Device]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[BookingFood] ADD CONSTRAINT [BookingFood_bookingId_fkey] FOREIGN KEY ([bookingId]) REFERENCES [dbo].[Booking]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[BookingFood] ADD CONSTRAINT [BookingFood_foodId_fkey] FOREIGN KEY ([foodId]) REFERENCES [dbo].[Food]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[BookingDrink] ADD CONSTRAINT [BookingDrink_bookingId_fkey] FOREIGN KEY ([bookingId]) REFERENCES [dbo].[Booking]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[BookingDrink] ADD CONSTRAINT [BookingDrink_drinkId_fkey] FOREIGN KEY ([drinkId]) REFERENCES [dbo].[Drink]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
