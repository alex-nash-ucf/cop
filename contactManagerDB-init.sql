-- Create the database
CREATE DATABASE contactManagerDB;

-- Use newly created database
USE contactManagerDB;

-- Create Tables
CREATE TABLE `contactManagerDB`.`Users` 
( 
	`ID` INT NOT NULL AUTO_INCREMENT , 
	`FirstName` VARCHAR(50) NOT NULL DEFAULT '' , 
	`LastName` VARCHAR(50) NOT NULL DEFAULT '' , 
	`Login` VARCHAR(50) NOT NULL DEFAULT '' , 
	`Password` VARCHAR(50) NOT NULL DEFAULT '' , 
	PRIMARY KEY (`ID`)
) ENGINE = InnoDB;

CREATE TABLE `contactManagerDB`.`Colors` 
( 
	`ID` INT NOT NULL AUTO_INCREMENT , 
	`Name` VARCHAR(50) NOT NULL DEFAULT '' , 
	`UserID` INT NOT NULL DEFAULT '0' , 
	PRIMARY KEY (`ID`)
) ENGINE = InnoDB;

CREATE TABLE `contactManagerDB`.`Contacts` 
( 
	`ID` INT NOT NULL AUTO_INCREMENT , 
	`FirstName` VARCHAR(50) NOT NULL DEFAULT '' , 
	`LastName` VARCHAR(50) NOT NULL DEFAULT '' , 
	`Phone` VARCHAR(50) NOT NULL DEFAULT '' , 
	`Email` VARCHAR(50) NOT NULL DEFAULT '' , 
	`UserID` INT NOT NULL DEFAULT '0' , 
	PRIMARY KEY (`ID`)
) ENGINE = InnoDB;

-- Populate Database Tables
insert into Users (FirstName,LastName,Login,Password) 
	VALUES ('Lance','Nelson','Lance','Pelipper');
insert into Users (FirstName,LastName,Login,Password) 
	VALUES ('Yama','Jiang','Yama','Riolu');
insert into Users (FirstName,LastName,Login,Password) 
	VALUES ('Lucas','Salinas','Lucas','Dratini');
insert into Users (FirstName,LastName,Login,Password) 
	VALUES ('Nathan','Davis','Nathan','test');
insert into Users (FirstName,LastName,Login,Password) 
	VALUES ('Alex','Nash','Alex','Lurantis');

insert into Colors (Name,UserID) VALUES ('Blue',1);
insert into Colors (Name,UserID) VALUES ('White',1);
insert into Colors (Name,UserID) VALUES ('Black',1);
insert into Colors (Name,UserID) VALUES ('gray',1);
insert into Colors (Name,UserID) VALUES ('Magenta',1);
insert into Colors (Name,UserID) VALUES ('Yellow',1);
insert into Colors (Name,UserID) VALUES ('Cyan',1);
insert into Colors (Name,UserID) VALUES ('Salmon',1);
insert into Colors (Name,UserID) VALUES ('Chartreuse',1);
insert into Colors (Name,UserID) VALUES ('Lime',1);
insert into Colors (Name,UserID) VALUES ('Light Blue',1);
insert into Colors (Name,UserID) VALUES ('Light Gray',1);
insert into Colors (Name,UserID) VALUES ('Light Red',1);
insert into Colors (Name,UserID) VALUES ('Light Green',1);
insert into Colors (Name,UserID) VALUES ('Chiffon',1);
insert into Colors (Name,UserID) VALUES ('Fuscia',1);
insert into Colors (Name,UserID) VALUES ('Brown',1);
insert into Colors (Name,UserID) VALUES ('Beige',1);
insert into Colors (Name,UserID) VALUES ('Blue',3);
insert into Colors (Name,UserID) VALUES ('White',3);
insert into Colors (Name,UserID) VALUES ('Black',3);
insert into Colors (Name,UserID) VALUES ('gray',3);
insert into Colors (Name,UserID) VALUES ('Magenta',3);
insert into Colors (Name,UserID) VALUES ('Yellow',3);
insert into Colors (Name,UserID) VALUES ('Cyan',3);
insert into Colors (Name,UserID) VALUES ('Salmon',3);
insert into Colors (Name,UserID) VALUES ('Chartreuse',3);
insert into Colors (Name,UserID) VALUES ('Lime',3);
insert into Colors (Name,UserID) VALUES ('Light Blue',3);
insert into Colors (Name,UserID) VALUES ('Light Gray',3);
insert into Colors (Name,UserID) VALUES ('Light Red',3);
insert into Colors (Name,UserID) VALUES ('Light Green',3);
insert into Colors (Name,UserID) VALUES ('Chiffon',3);
insert into Colors (Name,UserID) VALUES ('Fuscia',3);
insert into Colors (Name,UserID) VALUES ('Brown',3);
insert into Colors (Name,UserID) VALUES ('Beige',3);

-- Create user TheBeast with all privleges
create user 'TheBeast' identified by 'WeLoveCOP4331';
grant all privileges on contactManagerDB.* to 'TheBeast'@'%';