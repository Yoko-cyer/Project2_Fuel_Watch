DROP DATABASE IF EXISTS fuel_db;
CREATE DATABASE fuel_db;

USE fuel_db;

CREATE TABLE `fuel_db`.`user` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `post code` CHAR(4) NOT NULL,
  `search radius` INT NOT NULL,
  `fuel type` CHAR(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE);

  CREATE TABLE `fuel_db`.`servo` (
  `company name` VARCHAR(255) NOT NULL,
  `address` VARCHAR(45) NOT NULL,
  `id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `price` DECIMAL(3) NOT NULL,
  `distance` DECIMAL(2) NOT NULL,
  UNIQUE INDEX `address_UNIQUE` (`address` ASC) VISIBLE,
  PRIMARY KEY (`user_id`));
