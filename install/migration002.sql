SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

ALTER TABLE `collections_commons` ADD `metadata` VARCHAR(255) NOT NULL DEFAULT '';
ALTER TABLE `collections_commons` ADD `temp_format` VARCHAR(255) NOT NULL DEFAULT '';

ALTER TABLE `collections_commons` ADD `temp_volume_possedes` VARCHAR(255) NOT NULL DEFAULT '';
ALTER TABLE `collections_commons` ADD `temp_volume_max` VARCHAR(255) NOT NULL DEFAULT '';


UPDATE `collections_commons` SET `temp_format` = CONCAT(temp_format, ',"dvd"') WHERE FIND_IN_SET('dvd', format);
UPDATE `collections_commons` SET `temp_format` = CONCAT(temp_format, ',"blu-ray"') WHERE FIND_IN_SET('blu-ray', format);
UPDATE `collections_commons` SET `temp_format` = CONCAT(temp_format, ',"blu-ray 3d"') WHERE FIND_IN_SET('blu-ray 3d', format);
UPDATE `collections_commons` SET `temp_format` = CONCAT(temp_format, ',"blu-ray 4k"') WHERE FIND_IN_SET('blu-ray 4k', format);
UPDATE `collections_commons` SET `temp_format` = SUBSTRING(`temp_format`,2) WHERE `temp_format` NOT LIKE '';
UPDATE `collections_commons` SET `metadata` = CONCAT('{"format":[',temp_format,']}') WHERE `format` IS NOT NULL;


UPDATE `collections_commons` SET `temp_volume_possedes` = SUBSTRING_INDEX(volume_possedes, '/', 1) WHERE `volume_possedes` IS NOT NULL;
UPDATE `collections_commons` SET `temp_volume_max` = SUBSTRING_INDEX(volume_possedes, '/', -1) WHERE `volume_possedes` IS NOT NULL;
UPDATE `collections_commons` SET `metadata` = CONCAT('{"volumePossedes":"',temp_volume_possedes,'","volumeMax":"',temp_volume_max,'"}') WHERE `volume_possedes` IS NOT NULL;

ALTER TABLE `collections_commons` DROP `temp_format`;
ALTER TABLE `collections_commons` DROP `temp_volume_possedes`;
ALTER TABLE `collections_commons` DROP `temp_volume_max`;

SET FOREIGN_KEY_CHECKS=1;
COMMIT;