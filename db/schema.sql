DROP DATABASE IF EXISTS fuel_db;
CREATE DATABASE fuel_db;

USE fuel_db;

CREATE TABLE `fuel_db`.`user` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `post code` INT NOT NULL,
  `search radius` INT NOT NULL,
  `fuel type` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE);


CREATE TABLE `fuel_db`.`servo` (
  `id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `company name` VARCHAR(25) NOT NULL,
  `price` DECIMAL(5,2) NOT NULL,
  `distance` INT NOT NULL,
  PRIMARY KEY (`id`));
