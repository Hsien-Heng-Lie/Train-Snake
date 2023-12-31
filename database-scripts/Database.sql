CREATE DATABASE [TrainSnakeDB];
GO

USE TrainSnakeDB
GO;

CREATE TABLE [dbo].Player
(
	[Id] INT IDENTITY(1,1) PRIMARY KEY NOT NULL , 
  [UserName] VARCHAR(200) NOT NULL,
	CreatedDate DATETIME NOT NULL
);
GO


CREATE TABLE [dbo].GameLog
(
	[Id] UNIQUEIDENTIFIER PRIMARY KEY NOT NULL , 
  PlayerId INT NOT NULL,
	Score INT NULL,
	CreatedDate DATETIME NOT NULL,
	CONSTRAINT FK_GameLog_Player FOREIGN KEY (PlayerId) REFERENCES Player(Id)
);
GO