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
    [status] BIT NOT NULL CONSTRAINT [User_status_df] DEFAULT 1,
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
    [timed] BIT NOT NULL,
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
    [RoomColorId] INT,
    CONSTRAINT [Room_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[RoomColor] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000),
    CONSTRAINT [RoomColor_pkey] PRIMARY KEY CLUSTERED ([id])
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

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_departmentId_fkey] FOREIGN KEY ([departmentId]) REFERENCES [dbo].[Department]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_positionId_fkey] FOREIGN KEY ([positionId]) REFERENCES [dbo].[Position]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_roleId_fkey] FOREIGN KEY ([roleId]) REFERENCES [dbo].[Role]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Booking] ADD CONSTRAINT [Booking_ProgramId_fkey] FOREIGN KEY ([ProgramId]) REFERENCES [dbo].[Program]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Booking] ADD CONSTRAINT [Booking_StatusId_fkey] FOREIGN KEY ([StatusId]) REFERENCES [dbo].[Status]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Booking] ADD CONSTRAINT [Booking_MeetingTypeId_fkey] FOREIGN KEY ([MeetingTypeId]) REFERENCES [dbo].[MeetingType]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Booking] ADD CONSTRAINT [Booking_RoomId_fkey] FOREIGN KEY ([RoomId]) REFERENCES [dbo].[Room]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

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
ALTER TABLE [dbo].[Room] ADD CONSTRAINT [Room_RoomColorId_fkey] FOREIGN KEY ([RoomColorId]) REFERENCES [dbo].[RoomColor]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
