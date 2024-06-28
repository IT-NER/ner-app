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
    [active] BIT NOT NULL CONSTRAINT [User_active_df] DEFAULT 1,
    [departmentId] INT,
    [positionId] INT,
    [roleId] INT CONSTRAINT [User_roleId_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [point] INT CONSTRAINT [User_point_df] DEFAULT 0,
    [imgUrl] NVARCHAR(1000),
    [buttonLinkId] INT,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email]),
    CONSTRAINT [User_username_key] UNIQUE NONCLUSTERED ([username])
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
    [url] NVARCHAR(1000),
    [description] NVARCHAR(1000),
    [chairman] NVARCHAR(1000),
    [quantity] INT,
    [meetingId] NVARCHAR(1000),
    [meetingPassword] NVARCHAR(1000),
    [UserId] INT,
    [ApproveBy] INT,
    [MeetingTypeId] INT,
    [RoomId] INT,
    [ProgramId] INT,
    [StatusId] INT CONSTRAINT [Booking_StatusId_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Booking_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Booking_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Program] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000),
    CONSTRAINT [Program_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Status] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000),
    CONSTRAINT [Status_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[MeetingType] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000),
    CONSTRAINT [MeetingType_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[BookingDevice] (
    [BookingId] INT NOT NULL,
    [DeviceId] INT NOT NULL,
    CONSTRAINT [BookingDevice_pkey] PRIMARY KEY CLUSTERED ([BookingId],[DeviceId])
);

-- CreateTable
CREATE TABLE [dbo].[BookingFood] (
    [BookingId] INT NOT NULL,
    [FoodId] INT NOT NULL,
    CONSTRAINT [BookingFood_pkey] PRIMARY KEY CLUSTERED ([BookingId],[FoodId])
);

-- CreateTable
CREATE TABLE [dbo].[BookingDrink] (
    [BookingId] INT NOT NULL,
    [DrinkId] INT NOT NULL,
    CONSTRAINT [BookingDrink_pkey] PRIMARY KEY CLUSTERED ([BookingId],[DrinkId])
);

-- CreateTable
CREATE TABLE [dbo].[Room] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000),
    [quantity] INT,
    [color] NVARCHAR(1000),
    CONSTRAINT [Room_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Device] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000),
    CONSTRAINT [Device_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Food] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000),
    CONSTRAINT [Food_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Drink] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000),
    CONSTRAINT [Drink_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Content] (
    [id] INT NOT NULL IDENTITY(1,1),
    [ticket] NVARCHAR(1000) NOT NULL,
    [code] NVARCHAR(1000) NOT NULL,
    [title] NVARCHAR(1000),
    [description] NVARCHAR(1000),
    [detail] NVARCHAR(1000),
    [point] INT CONSTRAINT [Content_point_df] DEFAULT 0,
    [userId] INT,
    [contentTypeId] INT,
    [contentStatusId] INT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Content_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [active] BIT CONSTRAINT [Content_active_df] DEFAULT 1,
    CONSTRAINT [Content_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Content_ticket_key] UNIQUE NONCLUSTERED ([ticket]),
    CONSTRAINT [Content_code_key] UNIQUE NONCLUSTERED ([code])
);

-- CreateTable
CREATE TABLE [dbo].[ContentView] (
    [id] INT NOT NULL IDENTITY(1,1),
    [start] DATETIME2,
    [end] DATETIME2,
    [timed] BIT CONSTRAINT [ContentView_timed_df] DEFAULT 1,
    [name] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [ContentView_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [active] BIT CONSTRAINT [ContentView_active_df] DEFAULT 1,
    CONSTRAINT [ContentView_pkey] PRIMARY KEY CLUSTERED ([id])
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
CREATE TABLE [dbo].[ContentStatus] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [ContentStatus_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [active] BIT CONSTRAINT [ContentStatus_active_df] DEFAULT 1,
    CONSTRAINT [ContentStatus_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PointReceived] (
    [id] INT NOT NULL IDENTITY(1,1),
    [ticket] NVARCHAR(1000) NOT NULL,
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
    [ticket] NVARCHAR(1000) NOT NULL,
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
    [date] DATETIME2,
    [ticketReceived] NVARCHAR(1000),
    [ticketPay] NVARCHAR(1000),
    [pointReceived] INT,
    [pointPay] INT,
    [pointTotal] INT,
    [userId] INT,
    [pointReceivedId] INT,
    [pointPayId] INT,
    [rewardId] INT,
    CONSTRAINT [PointReceivedPay_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Reward] (
    [id] INT NOT NULL IDENTITY(1,1),
    [ticket] NVARCHAR(1000) NOT NULL,
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

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_buttonLinkId_fkey] FOREIGN KEY ([buttonLinkId]) REFERENCES [dbo].[ButtonLink]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_departmentId_fkey] FOREIGN KEY ([departmentId]) REFERENCES [dbo].[Department]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_positionId_fkey] FOREIGN KEY ([positionId]) REFERENCES [dbo].[Position]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_roleId_fkey] FOREIGN KEY ([roleId]) REFERENCES [dbo].[Role]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Booking] ADD CONSTRAINT [Booking_MeetingTypeId_fkey] FOREIGN KEY ([MeetingTypeId]) REFERENCES [dbo].[MeetingType]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Booking] ADD CONSTRAINT [Booking_ProgramId_fkey] FOREIGN KEY ([ProgramId]) REFERENCES [dbo].[Program]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Booking] ADD CONSTRAINT [Booking_RoomId_fkey] FOREIGN KEY ([RoomId]) REFERENCES [dbo].[Room]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Booking] ADD CONSTRAINT [Booking_StatusId_fkey] FOREIGN KEY ([StatusId]) REFERENCES [dbo].[Status]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Booking] ADD CONSTRAINT [Booking_UserId_fkey] FOREIGN KEY ([UserId]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[BookingDevice] ADD CONSTRAINT [BookingDevice_BookingId_fkey] FOREIGN KEY ([BookingId]) REFERENCES [dbo].[Booking]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[BookingDevice] ADD CONSTRAINT [BookingDevice_DeviceId_fkey] FOREIGN KEY ([DeviceId]) REFERENCES [dbo].[Device]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[BookingFood] ADD CONSTRAINT [BookingFood_BookingId_fkey] FOREIGN KEY ([BookingId]) REFERENCES [dbo].[Booking]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[BookingFood] ADD CONSTRAINT [BookingFood_FoodId_fkey] FOREIGN KEY ([FoodId]) REFERENCES [dbo].[Food]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[BookingDrink] ADD CONSTRAINT [BookingDrink_BookingId_fkey] FOREIGN KEY ([BookingId]) REFERENCES [dbo].[Booking]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[BookingDrink] ADD CONSTRAINT [BookingDrink_DrinkId_fkey] FOREIGN KEY ([DrinkId]) REFERENCES [dbo].[Drink]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Content] ADD CONSTRAINT [Content_contentStatusId_fkey] FOREIGN KEY ([contentStatusId]) REFERENCES [dbo].[ContentStatus]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Content] ADD CONSTRAINT [Content_contentTypeId_fkey] FOREIGN KEY ([contentTypeId]) REFERENCES [dbo].[ContentType]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Content] ADD CONSTRAINT [Content_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ContentImg] ADD CONSTRAINT [ContentImg_contentId_fkey] FOREIGN KEY ([contentId]) REFERENCES [dbo].[Content]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PointReceived] ADD CONSTRAINT [PointReceived_contentId_fkey] FOREIGN KEY ([contentId]) REFERENCES [dbo].[Content]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PointReceived] ADD CONSTRAINT [PointReceived_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PointPay] ADD CONSTRAINT [PointPay_contentId_fkey] FOREIGN KEY ([contentId]) REFERENCES [dbo].[Content]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PointPay] ADD CONSTRAINT [PointPay_rewardId_fkey] FOREIGN KEY ([rewardId]) REFERENCES [dbo].[Reward]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PointPay] ADD CONSTRAINT [PointPay_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PointReceivedPay] ADD CONSTRAINT [PointReceivedPay_pointPayId_fkey] FOREIGN KEY ([pointPayId]) REFERENCES [dbo].[PointPay]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PointReceivedPay] ADD CONSTRAINT [PointReceivedPay_pointReceivedId_fkey] FOREIGN KEY ([pointReceivedId]) REFERENCES [dbo].[PointReceived]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PointReceivedPay] ADD CONSTRAINT [PointReceivedPay_rewardId_fkey] FOREIGN KEY ([rewardId]) REFERENCES [dbo].[Reward]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PointReceivedPay] ADD CONSTRAINT [PointReceivedPay_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RewardImg] ADD CONSTRAINT [RewardImg_rewardId_fkey] FOREIGN KEY ([rewardId]) REFERENCES [dbo].[Reward]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
