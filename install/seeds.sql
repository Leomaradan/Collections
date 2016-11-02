-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Mer 02 Novembre 2016 à 11:12
-- Version du serveur :  5.7.11-log
-- Version de PHP :  7.0.4

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Vider la table avant d'insérer `collections_auteur`
--

TRUNCATE TABLE `collections_auteur`;
--
-- Contenu de la table `collections_auteur`
--

INSERT INTO `collections_auteur` (`id`, `nom`) VALUES(1, 'Alexandro Jodorowsky');
INSERT INTO `collections_auteur` (`id`, `nom`) VALUES(2, 'Isaac Asimov');
INSERT INTO `collections_auteur` (`id`, `nom`) VALUES(3, 'J.R.R. Tolkien');
INSERT INTO `collections_auteur` (`id`, `nom`) VALUES(4, 'Ken Akamatsu');
INSERT INTO `collections_auteur` (`id`, `nom`) VALUES(5, 'Mœbius');
INSERT INTO `collections_auteur` (`id`, `nom`) VALUES(6, 'Peter Jackson');
INSERT INTO `collections_auteur` (`id`, `nom`) VALUES(7, 'Takeshi Obata');
INSERT INTO `collections_auteur` (`id`, `nom`) VALUES(8, 'Tsugumi Ōba');
INSERT INTO `collections_auteur` (`id`, `nom`) VALUES(9, 'Zoran Janjetov');

-- --------------------------------------------------------

--
-- Vider la table avant d'insérer `collections_auteur_commons`
--

TRUNCATE TABLE `collections_auteur_commons`;
--
-- Contenu de la table `collections_auteur_commons`
--

INSERT INTO `collections_auteur_commons` (`auteur_id`, `commons_id`) VALUES(2, 1);
INSERT INTO `collections_auteur_commons` (`auteur_id`, `commons_id`) VALUES(2, 2);
INSERT INTO `collections_auteur_commons` (`auteur_id`, `commons_id`) VALUES(2, 3);
INSERT INTO `collections_auteur_commons` (`auteur_id`, `commons_id`) VALUES(3, 4);
INSERT INTO `collections_auteur_commons` (`auteur_id`, `commons_id`) VALUES(3, 5);
INSERT INTO `collections_auteur_commons` (`auteur_id`, `commons_id`) VALUES(3, 6);
INSERT INTO `collections_auteur_commons` (`auteur_id`, `commons_id`) VALUES(3, 7);
INSERT INTO `collections_auteur_commons` (`auteur_id`, `commons_id`) VALUES(1, 8);
INSERT INTO `collections_auteur_commons` (`auteur_id`, `commons_id`) VALUES(6, 8);
INSERT INTO `collections_auteur_commons` (`auteur_id`, `commons_id`) VALUES(1, 9);
INSERT INTO `collections_auteur_commons` (`auteur_id`, `commons_id`) VALUES(6, 9);
INSERT INTO `collections_auteur_commons` (`auteur_id`, `commons_id`) VALUES(1, 10);
INSERT INTO `collections_auteur_commons` (`auteur_id`, `commons_id`) VALUES(6, 10);
INSERT INTO `collections_auteur_commons` (`auteur_id`, `commons_id`) VALUES(1, 11);
INSERT INTO `collections_auteur_commons` (`auteur_id`, `commons_id`) VALUES(6, 11);
INSERT INTO `collections_auteur_commons` (`auteur_id`, `commons_id`) VALUES(1, 12);
INSERT INTO `collections_auteur_commons` (`auteur_id`, `commons_id`) VALUES(6, 12);
INSERT INTO `collections_auteur_commons` (`auteur_id`, `commons_id`) VALUES(1, 13);
INSERT INTO `collections_auteur_commons` (`auteur_id`, `commons_id`) VALUES(6, 13);
INSERT INTO `collections_auteur_commons` (`auteur_id`, `commons_id`) VALUES(1, 14);
INSERT INTO `collections_auteur_commons` (`auteur_id`, `commons_id`) VALUES(9, 14);
INSERT INTO `collections_auteur_commons` (`auteur_id`, `commons_id`) VALUES(1, 15);
INSERT INTO `collections_auteur_commons` (`auteur_id`, `commons_id`) VALUES(9, 15);
INSERT INTO `collections_auteur_commons` (`auteur_id`, `commons_id`) VALUES(1, 16);
INSERT INTO `collections_auteur_commons` (`auteur_id`, `commons_id`) VALUES(9, 16);
INSERT INTO `collections_auteur_commons` (`auteur_id`, `commons_id`) VALUES(1, 17);
INSERT INTO `collections_auteur_commons` (`auteur_id`, `commons_id`) VALUES(9, 17);
INSERT INTO `collections_auteur_commons` (`auteur_id`, `commons_id`) VALUES(1, 18);
INSERT INTO `collections_auteur_commons` (`auteur_id`, `commons_id`) VALUES(9, 18);
INSERT INTO `collections_auteur_commons` (`auteur_id`, `commons_id`) VALUES(1, 19);
INSERT INTO `collections_auteur_commons` (`auteur_id`, `commons_id`) VALUES(9, 19);
INSERT INTO `collections_auteur_commons` (`auteur_id`, `commons_id`) VALUES(7, 20);
INSERT INTO `collections_auteur_commons` (`auteur_id`, `commons_id`) VALUES(8, 20);
INSERT INTO `collections_auteur_commons` (`auteur_id`, `commons_id`) VALUES(4, 21);
INSERT INTO `collections_auteur_commons` (`auteur_id`, `commons_id`) VALUES(4, 22);
INSERT INTO `collections_auteur_commons` (`auteur_id`, `commons_id`) VALUES(6, 23);
INSERT INTO `collections_auteur_commons` (`auteur_id`, `commons_id`) VALUES(6, 24);
INSERT INTO `collections_auteur_commons` (`auteur_id`, `commons_id`) VALUES(6, 25);
INSERT INTO `collections_auteur_commons` (`auteur_id`, `commons_id`) VALUES(1, 26);

-- --------------------------------------------------------

--
-- Vider la table avant d'insérer `collections_commons`
--

TRUNCATE TABLE `collections_commons`;
--
-- Contenu de la table `collections_commons`
--

INSERT INTO `collections_commons` (`id`, `titre`, `serie_id`, `genre_id`, `type_id`, `couverture`, `format`, `volume`, `volume_possedes`) VALUES(1, 'Fondation', 1, 2, 5, '', NULL, 1, NULL);
INSERT INTO `collections_commons` (`id`, `titre`, `serie_id`, `genre_id`, `type_id`, `couverture`, `format`, `volume`, `volume_possedes`) VALUES(2, 'Fondation et Empire', 1, 2, 5, '', NULL, 2, NULL);
INSERT INTO `collections_commons` (`id`, `titre`, `serie_id`, `genre_id`, `type_id`, `couverture`, `format`, `volume`, `volume_possedes`) VALUES(3, 'Seconde Fondation', 1, 2, 5, '', NULL, 3, NULL);
INSERT INTO `collections_commons` (`id`, `titre`, `serie_id`, `genre_id`, `type_id`, `couverture`, `format`, `volume`, `volume_possedes`) VALUES(4, 'Le Seigneur des Anneaux - La Communauté de l''Anneau', 2, 1, 5, '', NULL, 1, NULL);
INSERT INTO `collections_commons` (`id`, `titre`, `serie_id`, `genre_id`, `type_id`, `couverture`, `format`, `volume`, `volume_possedes`) VALUES(5, 'Le Seigneur des Anneaux - Les Deux Tours', 2, 1, 5, '', NULL, 2, NULL);
INSERT INTO `collections_commons` (`id`, `titre`, `serie_id`, `genre_id`, `type_id`, `couverture`, `format`, `volume`, `volume_possedes`) VALUES(6, 'Le Seigneur des Anneaux - Le Retour du Roi', 2, 1, 5, '', NULL, 3, NULL);
INSERT INTO `collections_commons` (`id`, `titre`, `serie_id`, `genre_id`, `type_id`, `couverture`, `format`, `volume`, `volume_possedes`) VALUES(7, 'Bilbo le Hobbit', NULL, 1, 5, '', NULL, NULL, NULL);
INSERT INTO `collections_commons` (`id`, `titre`, `serie_id`, `genre_id`, `type_id`, `couverture`, `format`, `volume`, `volume_possedes`) VALUES(8, 'L''Incal Noir', 3, 2, 1, '', NULL, 1, NULL);
INSERT INTO `collections_commons` (`id`, `titre`, `serie_id`, `genre_id`, `type_id`, `couverture`, `format`, `volume`, `volume_possedes`) VALUES(9, 'L''Incal Lumière', 3, 2, 1, '', NULL, 2, NULL);
INSERT INTO `collections_commons` (`id`, `titre`, `serie_id`, `genre_id`, `type_id`, `couverture`, `format`, `volume`, `volume_possedes`) VALUES(10, 'Ce qui est en bas', 3, 2, 1, '', NULL, 3, NULL);
INSERT INTO `collections_commons` (`id`, `titre`, `serie_id`, `genre_id`, `type_id`, `couverture`, `format`, `volume`, `volume_possedes`) VALUES(11, 'Ce qui est en haut', 3, 2, 1, '', NULL, 4, NULL);
INSERT INTO `collections_commons` (`id`, `titre`, `serie_id`, `genre_id`, `type_id`, `couverture`, `format`, `volume`, `volume_possedes`) VALUES(12, 'La Cinquième Essence, 1ère partie', 3, 2, 1, '', NULL, 5, NULL);
INSERT INTO `collections_commons` (`id`, `titre`, `serie_id`, `genre_id`, `type_id`, `couverture`, `format`, `volume`, `volume_possedes`) VALUES(13, 'La Cinquième Essence, 2ère partie', 3, 2, 1, '', NULL, 6, NULL);
INSERT INTO `collections_commons` (`id`, `titre`, `serie_id`, `genre_id`, `type_id`, `couverture`, `format`, `volume`, `volume_possedes`) VALUES(14, 'Adieu le père', 4, 2, 1, '', NULL, 1, NULL);
INSERT INTO `collections_commons` (`id`, `titre`, `serie_id`, `genre_id`, `type_id`, `couverture`, `format`, `volume`, `volume_possedes`) VALUES(15, 'Détective privé de classe "R"', 4, 2, 1, '', NULL, 2, NULL);
INSERT INTO `collections_commons` (`id`, `titre`, `serie_id`, `genre_id`, `type_id`, `couverture`, `format`, `volume`, `volume_possedes`) VALUES(16, 'Croot', 4, 2, 1, '', NULL, 3, NULL);
INSERT INTO `collections_commons` (`id`, `titre`, `serie_id`, `genre_id`, `type_id`, `couverture`, `format`, `volume`, `volume_possedes`) VALUES(17, 'Anarcopsychotiques', 4, 2, 1, '', NULL, 4, NULL);
INSERT INTO `collections_commons` (`id`, `titre`, `serie_id`, `genre_id`, `type_id`, `couverture`, `format`, `volume`, `volume_possedes`) VALUES(18, 'Ouisky, SPV et homéoputes', 4, 2, 1, '', NULL, 5, NULL);
INSERT INTO `collections_commons` (`id`, `titre`, `serie_id`, `genre_id`, `type_id`, `couverture`, `format`, `volume`, `volume_possedes`) VALUES(19, 'Suicide allée', 4, 2, 1, '', NULL, 6, NULL);
INSERT INTO `collections_commons` (`id`, `titre`, `serie_id`, `genre_id`, `type_id`, `couverture`, `format`, `volume`, `volume_possedes`) VALUES(20, 'Death Note', NULL, 3, 4, '', NULL, NULL, '1-13/13');
INSERT INTO `collections_commons` (`id`, `titre`, `serie_id`, `genre_id`, `type_id`, `couverture`, `format`, `volume`, `volume_possedes`) VALUES(21, 'Love Hina', NULL, 3, 4, '', NULL, NULL, '1-4/14');
INSERT INTO `collections_commons` (`id`, `titre`, `serie_id`, `genre_id`, `type_id`, `couverture`, `format`, `volume`, `volume_possedes`) VALUES(22, 'Negima', NULL, 3, 4, '', NULL, NULL, '1-38/38');
INSERT INTO `collections_commons` (`id`, `titre`, `serie_id`, `genre_id`, `type_id`, `couverture`, `format`, `volume`, `volume_possedes`) VALUES(23, 'Le Seigneur des Anneaux - La Communauté de l''Anneau', 5, 2, 2, '', 'dvd,blu-ray', 1, NULL);
INSERT INTO `collections_commons` (`id`, `titre`, `serie_id`, `genre_id`, `type_id`, `couverture`, `format`, `volume`, `volume_possedes`) VALUES(24, 'Le Seigneur des Anneaux - Les Deux Tours', 5, 2, 2, '', 'dvd,blu-ray', 2, NULL);
INSERT INTO `collections_commons` (`id`, `titre`, `serie_id`, `genre_id`, `type_id`, `couverture`, `format`, `volume`, `volume_possedes`) VALUES(25, 'Le Seigneur des Anneaux - Le Retour du Roi', 5, 2, 2, '', 'dvd,blu-ray', 3, NULL);
INSERT INTO `collections_commons` (`id`, `titre`, `serie_id`, `genre_id`, `type_id`, `couverture`, `format`, `volume`, `volume_possedes`) VALUES(26, 'Jodorowsky''s Dune', NULL, 4, 2, '', 'dvd', NULL, NULL);

-- --------------------------------------------------------

--
-- Vider la table avant d'insérer `collections_genre`
--

TRUNCATE TABLE `collections_genre`;
--
-- Contenu de la table `collections_genre`
--

INSERT INTO `collections_genre` (`id`, `nom`, `type_id`) VALUES(1, 'Fantasy', NULL);
INSERT INTO `collections_genre` (`id`, `nom`, `type_id`) VALUES(2, 'Science-Fiction', NULL);
INSERT INTO `collections_genre` (`id`, `nom`, `type_id`) VALUES(3, 'Shōnen', 4);
INSERT INTO `collections_genre` (`id`, `nom`, `type_id`) VALUES(4, 'Documentaire', 2);
INSERT INTO `collections_genre` (`id`, `nom`, `type_id`) VALUES(5, 'Roman Policier', 5);
INSERT INTO `collections_genre` (`id`, `nom`, `type_id`) VALUES(6, 'Livre en anglais', 3);

-- --------------------------------------------------------

--
-- Vider la table avant d'insérer `collections_serie`
--

TRUNCATE TABLE `collections_serie`;
--
-- Contenu de la table `collections_serie`
--

INSERT INTO `collections_serie` (`id`, `nom`, `type_id`, `volume_max`) VALUES(1, 'Fondation', 5, 3);
INSERT INTO `collections_serie` (`id`, `nom`, `type_id`, `volume_max`) VALUES(2, 'Le Seigneur des Anneaux', 5, 3);
INSERT INTO `collections_serie` (`id`, `nom`, `type_id`, `volume_max`) VALUES(3, 'L''Incal', 1, 6);
INSERT INTO `collections_serie` (`id`, `nom`, `type_id`, `volume_max`) VALUES(4, 'Avant l''Incal', 1, 6);
INSERT INTO `collections_serie` (`id`, `nom`, `type_id`, `volume_max`) VALUES(5, 'Le Seigneur des Anneaux', 2, 3);


SET FOREIGN_KEY_CHECKS=1;
COMMIT;
