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

CREATE TABLE `contactManagerDB`.`Types`
(
	`ID` INT NOT NULL AUTO_INCREMENT ,
    `Name` VARCHAR(15) NOT NULL DEFAULT '' ,
    PRIMARY KEY (`ID`)
) ENGINE = InnoDB;

CREATE TABLE `contactManagerDB`.`Pokemon`
(
	`ID` INT NOT NULL AUTO_INCREMENT ,
    `Name` VARCHAR(50) NOT NULL DEFAULT '' ,
    `Type1` INT NOT NULL DEFAULT 1 ,
    `Type2` INT ,
    `TotalStats` INT ,
    `HP` INT ,
    `Attack` INT ,
    `Defense` INT ,
    `SpAtk` INT ,
    `SpDef` INT ,
    `Speed` INT ,
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

insert into contacts (FirstName,LastName,Phone,Email) 
	VALUES ('Lance','Nelson',1111111111,'email');
insert into contacts (FirstName,LastName,Phone,Email) 
	VALUES ('Yama','Jiang',2222222222,'email');
insert into contacts (FirstName,LastName,Phone,Email) 
	VALUES ('Lucas','Salinas',3333333333,'email');
insert into contacts (FirstName,LastName,Phone,Email)  
	VALUES ('Nathan','Davis',4444444444,'test');
insert into contacts (FirstName,LastName,Phone,Email) 
	VALUES ('Alex','Nash',5555555555,'email');

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

insert into Types (Name) VALUES ('Normal');
insert into Types (Name) VALUES ('Fighting');
insert into Types (Name) VALUES ('Flying');
insert into Types (Name) VALUES ('Poison');
insert into Types (Name) VALUES ('Ground');
insert into Types (Name) VALUES ('Rock');
insert into Types (Name) VALUES ('Bug');
insert into Types (Name) VALUES ('Ghost');
insert into Types (Name) VALUES ('Steel');
insert into Types (Name) VALUES ('Fire');
insert into Types (Name) VALUES ('Water');
insert into Types (Name) VALUES ('Grass');
insert into Types (Name) VALUES ('Electric');
insert into Types (Name) VALUES ('Psychic');
insert into Types (Name) VALUES ('Ice');
insert into Types (Name) VALUES ('Dragon');
insert into Types (Name) VALUES ('Dark');
insert into Types (Name) VALUES ('Fairy');

insert into Pokemon (Name, Type1, Type2, TotalStats, HP, Attack, Defense, SpAtk, SpDef, Speed)
	VALUES ('Bulbasaur', 12, 4, 318, 45, 49, 49, 65, 65, 45);
insert into Pokemon (Name, Type1, Type2, TotalStats, HP, Attack, Defense, SpAtk, SpDef, Speed)
	VALUES ('Ivysaur', 12, 4, 405, 60, 62, 63, 80, 80, 60);
insert into Pokemon (Name, Type1, Type2, TotalStats, HP, Attack, Defense, SpAtk, SpDef, Speed)
	VALUES ('Venusaur', 12, 4, 525, 80, 82, 83, 100, 100, 80);
insert into Pokemon (Name, Type1, TotalStats, HP, Attack, Defense, SpAtk, SpDef, Speed)
	VALUES ('Charmander', 10, 309, 39, 52, 43, 60, 50, 65);
insert into Pokemon (Name, Type1, TotalStats, HP, Attack, Defense, SpAtk, SpDef, Speed)
	VALUES ('Charmeleon', 10, 405, 58, 64, 58, 80, 65, 80);
insert into Pokemon (Name, Type1, Type2, TotalStats, HP, Attack, Defense, SpAtk, SpDef, Speed)
	VALUES ('Charizard', 10, 3, 534, 78, 84, 78, 109, 85, 100);
insert into Pokemon (Name, Type1, TotalStats, HP, Attack, Defense, SpAtk, SpDef, Speed)
	VALUES ('Squirtle', 11, 314, 44, 48, 65, 50, 64, 43);
insert into Pokemon (Name, Type1, TotalStats, HP, Attack, Defense, SpAtk, SpDef, Speed)
	VALUES ('Wartortle', 11, 405, 59, 63, 80, 65, 80, 58);
insert into Pokemon (Name, Type1, TotalStats, HP, Attack, Defense, SpAtk, SpDef, Speed)
	VALUES ('Blastoise', 11, 530, 79, 83, 100, 85, 105, 78);



-- Create user TheBeast with all privleges
create user 'TheBeast' identified by 'WeLoveCOP4331';
grant all privileges on contactManagerDB.* to 'TheBeast'@'%';