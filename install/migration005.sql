SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

INSERT INTO `collections_type` (`id`, `nom`, `description`) VALUES(8, 'jv', 'Jeux Video');

DROP VIEW IF EXISTS `collections_view_jeuxvideo`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `collections_view_jeuxvideo` AS 
select `c`.`id` AS `id`,`c`.`titre` AS `titre`,`c`.`serie_id` AS `serie_id`, `s`.`nom` AS `serie`,`c`.`genre_id` AS `genre_id`, 
`g`.`nom` AS `genre`,`c`.`couverture` AS `couverture`, `c`.`metadata`, `c`.`updated_at`, `s`.`updated_at` AS `serie_updated_at`, `g`.`updated_at` AS `genre_updated_at`
from `collections_commons` `c` left join `collections_serie` `s` on(`c`.`serie_id` = `s`.`id`) join `collections_genre` `g` on(`c`.`genre_id` = `g`.`id`) 
join `collections_type` `t` on(`c`.`type_id` = `t`.`id`) where (`t`.`nom` like 'jv') group by `c`.`id`;


ALTER TABLE `collections_auteur` ADD `nom_key` VARCHAR(255) NOT NULL DEFAULT '' AFTER `nom`;
ALTER TABLE `collections_genre` ADD `nom_key` VARCHAR(255) NOT NULL DEFAULT '' AFTER `nom`;
ALTER TABLE `collections_serie` ADD `nom_key` VARCHAR(255) NOT NULL DEFAULT '' AFTER `nom`;

DELIMITER $$
CREATE FUNCTION make_key(in_name VARCHAR(255)) RETURNS VARCHAR(255)
    BEGIN
        DECLARE name_key VARCHAR(255) DEFAULT '';

        SET name_key = LOWER(in_name);
        SET name_key = REPLACE(name_key, 'â', 'a');
        SET name_key = REPLACE(name_key, 'ä', 'a');
        SET name_key = REPLACE(name_key, 'ā', 'a');
        SET name_key = REPLACE(name_key, 'æ', 'ae');
        SET name_key = REPLACE(name_key, 'ï', 'i');
        SET name_key = REPLACE(name_key, 'ī', 'i');
        SET name_key = REPLACE(name_key, 'û', 'u');
        SET name_key = REPLACE(name_key, 'ù', 'u');
        SET name_key = REPLACE(name_key, 'ü', 'u');
        SET name_key = REPLACE(name_key, 'ū', 'u');
        SET name_key = REPLACE(name_key, 'é', 'e');
        SET name_key = REPLACE(name_key, 'è', 'e');
        SET name_key = REPLACE(name_key, 'ê', 'e');
        SET name_key = REPLACE(name_key, 'ë', 'e');
        SET name_key = REPLACE(name_key, 'ē', 'e');
        SET name_key = REPLACE(name_key, 'ô', 'o');
        SET name_key = REPLACE(name_key, 'ö', 'o');
        SET name_key = REPLACE(name_key, 'ó', 'o');
        SET name_key = REPLACE(name_key, 'ō', 'o');
        SET name_key = REPLACE(name_key, 'ø', 'o');
        SET name_key = REPLACE(name_key, 'œ', 'oe');
        SET name_key = REPLACE(name_key, 'ñ', 'n');
        SET name_key = REPLACE(name_key, 'ç', 'c');
        SET name_key = REPLACE(name_key, '-', ' ');
        SET name_key = REPLACE(name_key, '.', '');

        return name_key;
END $$
DELIMITER ;

CREATE TRIGGER `key_auteur_insert` BEFORE INSERT ON `collections_auteur` FOR EACH ROW SET NEW.nom_key = make_key(NEW.nom);
CREATE TRIGGER `key_genre_insert` BEFORE INSERT ON `collections_genre` FOR EACH ROW SET NEW.nom_key = make_key(NEW.nom);
CREATE TRIGGER `key_serie_insert` BEFORE INSERT ON `collections_serie` FOR EACH ROW SET NEW.nom_key = make_key(NEW.nom);

DROP TRIGGER IF EXISTS `collections_auteur_update`;CREATE DEFINER=`leo`@`localhost` TRIGGER `collections_auteur_update` BEFORE UPDATE ON `collections_auteur` FOR EACH ROW BEGIN SET NEW.updated_at = CURRENT_TIMESTAMP, NEW.nom_key = make_key(NEW.nom); END
DROP TRIGGER IF EXISTS `collections_genre_update`;CREATE DEFINER=`leo`@`localhost` TRIGGER `collections_genre_update` BEFORE UPDATE ON `collections_genre` FOR EACH ROW BEGIN SET NEW.updated_at = CURRENT_TIMESTAMP, NEW.nom_key = make_key(NEW.nom); END
DROP TRIGGER IF EXISTS `collections_serie_update`;CREATE DEFINER=`leo`@`localhost` TRIGGER `collections_serie_update` BEFORE UPDATE ON `collections_serie` FOR EACH ROW BEGIN SET NEW.updated_at = CURRENT_TIMESTAMP, NEW.nom_key = make_key(NEW.nom); END

UPDATE collections_auteur SET nom = nom;
UPDATE collections_genre SET nom = nom;
UPDATE collections_serie SET nom = nom;

ALTER TABLE collections_auteur DROP INDEX nom;
ALTER TABLE `collections_auteur` ADD UNIQUE KEY `nom_key` (`nom_key`);

ALTER TABLE `collections_genre` ADD UNIQUE KEY `nom_key` (`nom_key`,`type_id`);

ALTER TABLE collections_serie DROP INDEX nom;
ALTER TABLE `collections_serie` ADD UNIQUE KEY `nom_key` (`nom_key`,`type_id`);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;
