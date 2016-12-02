SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

ALTER TABLE `collections_type` ADD `description` varchar(255) NOT NULL DEFAULT '';

UPDATE `collections_type` SET `description` = 'Bd' WHERE `collections_type`.`id` = 1;
UPDATE `collections_type` SET `description` = 'Film' WHERE `collections_type`.`id` = 2;
UPDATE `collections_type` SET `description` = 'Livre (BD, Manga, Roman)' WHERE `collections_type`.`id` = 3;
UPDATE `collections_type` SET `description` = 'Manga' WHERE `collections_type`.`id` = 4;
UPDATE `collections_type` SET `description` = 'Roman' WHERE `collections_type`.`id` = 5;
UPDATE `collections_type` SET `description` = 'Série TV' WHERE `collections_type`.`id` = 6;
UPDATE `collections_type` SET `description` = 'Vidéo (Film, Série TV)' WHERE `collections_type`.`id` = 7;

DROP VIEW IF EXISTS `collections_view_genre`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `collections_view_genre` AS
SELECT `g`.`id`, `g`.`nom`, `g`.`type_id`, `t`.`nom` AS `type`, `t`.`description` AS `type_description`, 
	count(`c`.`id`) as `utilisation`, `g`.`updated_at`, `t`.`updated_at` AS `type_updated_at`
FROM `collections_genre` AS `g` 
LEFT JOIN `collections_type` AS `t` ON (`g`.`type_id` = `t`.`id`)
LEFT JOIN `collections_commons` AS `c` on (`g`.`id` = `c`.`genre_id`) GROUP BY (`g`.`id`);

DROP VIEW IF EXISTS `collections_view_serie`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `collections_view_serie` AS
SELECT `g`.`id`, `g`.`nom`, `g`.`volume_max`, `g`.`type_id`, `t`.`nom` AS `type`, `t`.`description` AS `type_description`, 
	count(`c`.`id`) as `utilisation`, `g`.`updated_at`, `t`.`updated_at` AS `type_updated_at`
FROM `collections_serie` AS `g` 
LEFT JOIN `collections_type` AS `t` ON (`g`.`type_id` = `t`.`id`)
LEFT JOIN `collections_commons` AS `c` on (`g`.`id` = `c`.`serie_id`) GROUP BY (`g`.`id`);

DROP VIEW IF EXISTS `collections_view_auteur`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `collections_view_auteur` AS
SELECT `g`.`id`, `g`.`nom`, count(`c`.`commons_id`) as `utilisation`, `g`.`updated_at`
FROM `collections_auteur` AS `g` 
LEFT JOIN `collections_auteur_commons` AS `c` on (`g`.`id` = `c`.`auteur_id`) GROUP BY (`g`.`id`);


SET FOREIGN_KEY_CHECKS=1;
COMMIT;