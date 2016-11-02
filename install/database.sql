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
-- Base de données :  `slim`
--

-- --------------------------------------------------------

--
-- Structure de la table `collections_auteur`
--

CREATE TABLE IF NOT EXISTS `collections_auteur` (
`id` smallint(5) unsigned NOT NULL,
  `nom` varchar(50) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

-- --------------------------------------------------------

--
-- Structure de la table `collections_auteur_commons`
--

CREATE TABLE IF NOT EXISTS `collections_auteur_commons` (
  `auteur_id` smallint(5) unsigned NOT NULL,
  `commons_id` int(10) unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- --------------------------------------------------------

--
-- Structure de la table `collections_commons`
--

CREATE TABLE IF NOT EXISTS `collections_commons` (
`id` int(10) unsigned NOT NULL,
  `titre` varchar(100) NOT NULL,
  `serie_id` smallint(5) unsigned DEFAULT NULL COMMENT 'non utilisé pour les manga',
  `genre_id` tinyint(3) unsigned NOT NULL,
  `type_id` tinyint(3) unsigned NOT NULL,
  `couverture` varchar(255) NOT NULL DEFAULT '',
  `format` set('dvd','blu-ray','blu-ray 3d','blu-ray 4k') DEFAULT NULL COMMENT 'uniquement pour les films',
  `volume` smallint(5) unsigned DEFAULT NULL COMMENT 'uniquement pour les romans et bd',
  `volume_possedes` varchar(255) DEFAULT NULL COMMENT 'uniquement pour les mangas'
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=27 ;

-- --------------------------------------------------------

--
-- Structure de la table `collections_genre`
--

CREATE TABLE IF NOT EXISTS `collections_genre` (
`id` tinyint(3) unsigned NOT NULL,
  `nom` varchar(50) NOT NULL,
  `type_id` tinyint(3) unsigned DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;


-- --------------------------------------------------------

--
-- Structure de la table `collections_serie`
--

CREATE TABLE IF NOT EXISTS `collections_serie` (
`id` smallint(5) unsigned NOT NULL,
  `nom` varchar(50) NOT NULL,
  `type_id` tinyint(3) unsigned NOT NULL,
  `volume_max` tinyint(3) unsigned NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

-- --------------------------------------------------------

--
-- Structure de la table `collections_type`
--

CREATE TABLE IF NOT EXISTS `collections_type` (
`id` tinyint(3) unsigned NOT NULL,
  `nom` varchar(30) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Vider la table avant d'insérer `collections_type`
--

TRUNCATE TABLE `collections_type`;
--
-- Contenu de la table `collections_type`
--

INSERT INTO `collections_type` (`id`, `nom`) VALUES(1, 'bd');
INSERT INTO `collections_type` (`id`, `nom`) VALUES(2, 'film');
INSERT INTO `collections_type` (`id`, `nom`) VALUES(3, 'livre');
INSERT INTO `collections_type` (`id`, `nom`) VALUES(4, 'manga');
INSERT INTO `collections_type` (`id`, `nom`) VALUES(5, 'roman');

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `collections_view_bd`
--
CREATE TABLE IF NOT EXISTS `collections_view_bd` (
`id` int(10) unsigned
,`titre` varchar(100)
,`serie_id` smallint(5) unsigned
,`serie` varchar(50)
,`genre` varchar(50)
,`couverture` varchar(255)
,`volume` smallint(5) unsigned
,`volume_max` tinyint(3) unsigned
,`auteurs` text
);
-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `collections_view_film`
--
CREATE TABLE IF NOT EXISTS `collections_view_film` (
`id` int(10) unsigned
,`titre` varchar(100)
,`serie_id` smallint(5) unsigned
,`serie` varchar(50)
,`genre_id` tinyint(3) unsigned
,`genre` varchar(50)
,`couverture` varchar(255)
,`format` set('dvd','blu-ray','blu-ray 3d','blu-ray 4k')
,`volume` smallint(5) unsigned
,`volume_max` tinyint(3) unsigned
,`auteurs` text
);
-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `collections_view_manga`
--
CREATE TABLE IF NOT EXISTS `collections_view_manga` (
`id` int(10) unsigned
,`titre` varchar(100)
,`genre_id` tinyint(3) unsigned
,`genre` varchar(50)
,`couverture` varchar(255)
,`volume_possedes` varchar(255)
,`auteurs` text
);
-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `collections_view_romans`
--
CREATE TABLE IF NOT EXISTS `collections_view_roman` (
`id` int(10) unsigned
,`titre` varchar(100)
,`serie_id` smallint(5) unsigned
,`serie` varchar(50)
,`genre_id` tinyint(3) unsigned
,`genre` varchar(50)
,`couverture` varchar(255)
,`volume` smallint(5) unsigned
,`volume_max` tinyint(3) unsigned
,`auteurs` text
);
-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `collections_view_total`
--
CREATE TABLE IF NOT EXISTS `collections_view_total` (
`id` int(10) unsigned
,`titre` varchar(100)
,`serie_id` smallint(5) unsigned
,`serie` varchar(50)
,`genre_id` tinyint(3) unsigned
,`genre` varchar(50)
,`type_id` tinyint(3) unsigned
,`type` varchar(30)
,`couverture` varchar(255)
,`format` set('dvd','blu-ray','blu-ray 3d','blu-ray 4k')
,`volume` smallint(5) unsigned
,`volume_possedes` varchar(255)
,`volume_max` tinyint(3) unsigned
,`auteurs` text
);
-- --------------------------------------------------------

--
-- Structure de la vue `collections_view_bd`
--
DROP TABLE IF EXISTS `collections_view_bd`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `collections_view_bd` AS select `c`.`id` AS `id`,`c`.`titre` AS `titre`,`c`.`serie_id` AS `serie_id`, `s`.`nom` AS `serie`,`c`.`genre_id` AS `genre_id`, `g`.`nom` AS `genre`,`c`.`couverture` AS `couverture`,`c`.`volume` AS `volume`,`s`.`volume_max` AS `volume_max`,
group_concat(`a`.`id` order by `a`.`nom` ASC separator ', ') AS `auteurs_id` ,
group_concat(`a`.`nom` order by `a`.`nom` ASC separator ', ') AS `auteurs` 
from (((((`collections_commons` `c` left join `collections_serie` `s` on((`c`.`serie_id` = `s`.`id`))) join `collections_genre` `g` on((`c`.`genre_id` = `g`.`id`))) join `collections_type` `t` on((`c`.`type_id` = `t`.`id`))) left join `collections_auteur_commons` `ac` on((`c`.`id` = `ac`.`commons_id`))) left join `collections_auteur` `a` on((`a`.`id` = `ac`.`auteur_id`))) where (`t`.`nom` like 'bd') group by `c`.`id`;

-- --------------------------------------------------------

--
-- Structure de la vue `collections_view_film`
--
DROP TABLE IF EXISTS `collections_view_film`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `collections_view_film` AS select `c`.`id` AS `id`,`c`.`titre` AS `titre`,`c`.`serie_id` AS `serie_id`, `s`.`nom` AS `serie`,`c`.`genre_id` AS `genre_id`, `g`.`nom` AS `genre`,`c`.`couverture` AS `couverture`,`c`.`format` AS `format`,`c`.`volume` AS `volume`,`s`.`volume_max` AS `volume_max`,
group_concat(`a`.`id` order by `a`.`nom` ASC separator ', ') AS `auteurs_id` ,
group_concat(`a`.`nom` order by `a`.`nom` ASC separator ', ') AS `auteurs` 
from (((((`collections_commons` `c` left join `collections_serie` `s` on((`c`.`serie_id` = `s`.`id`))) join `collections_genre` `g` on((`c`.`genre_id` = `g`.`id`))) join `collections_type` `t` on((`c`.`type_id` = `t`.`id`))) left join `collections_auteur_commons` `ac` on((`c`.`id` = `ac`.`commons_id`))) left join `collections_auteur` `a` on((`a`.`id` = `ac`.`auteur_id`))) where (`t`.`nom` like 'film') group by `c`.`id`;

-- --------------------------------------------------------

--
-- Structure de la vue `collections_view_manga`
--
DROP TABLE IF EXISTS `collections_view_manga`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `collections_view_manga` AS select `c`.`id` AS `id`,`c`.`titre` AS `titre`,`c`.`genre_id` AS `genre_id`, `g`.`nom` AS `genre`,`c`.`couverture` AS `couverture`,`c`.`volume_possedes` AS `volume_possedes`,
group_concat(`a`.`id` order by `a`.`nom` ASC separator ', ') AS `auteurs_id`,  
group_concat(`a`.`nom` order by `a`.`nom` ASC separator ', ') AS `auteurs` 
from ((((`collections_commons` `c` join `collections_genre` `g` on((`c`.`genre_id` = `g`.`id`))) join `collections_type` `t` on((`c`.`type_id` = `t`.`id`))) left join `collections_auteur_commons` `ac` on((`c`.`id` = `ac`.`commons_id`))) left join `collections_auteur` `a` on((`a`.`id` = `ac`.`auteur_id`))) where (`t`.`nom` like 'manga') group by `c`.`id`;

-- --------------------------------------------------------

--
-- Structure de la vue `collections_view_romans`
--
DROP TABLE IF EXISTS `collections_view_roman`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `collections_view_roman` AS select `c`.`id` AS `id`,`c`.`titre` AS `titre`,`c`.`serie_id` AS `serie_id`, `s`.`nom` AS `serie`,`c`.`genre_id` AS `genre_id`, `g`.`nom` AS `genre`,`c`.`couverture` AS `couverture`,`c`.`volume` AS `volume`,`s`.`volume_max` AS `volume_max`,
group_concat(`a`.`id` order by `a`.`nom` ASC separator ', ') AS `auteurs_id`, 
group_concat(`a`.`nom` order by `a`.`nom` ASC separator ', ') AS `auteurs` 
from (((((`collections_commons` `c` left join `collections_serie` `s` on((`c`.`serie_id` = `s`.`id`))) join `collections_genre` `g` on((`c`.`genre_id` = `g`.`id`))) join `collections_type` `t` on((`c`.`type_id` = `t`.`id`))) left join `collections_auteur_commons` `ac` on((`c`.`id` = `ac`.`commons_id`))) left join `collections_auteur` `a` on((`a`.`id` = `ac`.`auteur_id`))) where (`t`.`nom` like 'roman') group by `c`.`id`;

-- --------------------------------------------------------

--
-- Structure de la vue `collections_view_total`
--
DROP TABLE IF EXISTS `collections_view_total`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `collections_view_total` AS select `c`.`id` AS `id`,`c`.`titre` AS `titre`,`c`.`serie_id` AS `serie_id`, `s`.`nom` AS `serie`,`c`.`genre_id` AS `genre_id`, `g`.`nom` AS `genre`,`c`.`type_id` AS `type_id`, `t`.`nom` AS `type`,`c`.`couverture` AS `couverture`,`c`.`format` AS `format`,`c`.`volume` AS `volume`,`c`.`volume_possedes` AS `volume_possedes`,`s`.`volume_max` AS `volume_max`,
group_concat(`a`.`id` order by `a`.`nom` ASC separator ', ') AS `auteurs_id`, 
group_concat(`a`.`nom` order by `a`.`nom` ASC separator ', ') AS `auteurs` 
from (((((`collections_commons` `c` left join `collections_serie` `s` on((`c`.`serie_id` = `s`.`id`))) join `collections_genre` `g` on((`c`.`genre_id` = `g`.`id`))) join `collections_type` `t` on((`c`.`type_id` = `t`.`id`))) left join `collections_auteur_commons` `ac` on((`c`.`id` = `ac`.`commons_id`))) left join `collections_auteur` `a` on((`a`.`id` = `ac`.`auteur_id`))) group by `c`.`id`;

--
-- Index pour les tables exportées
--

--
-- Index pour la table `collections_auteur`
--
ALTER TABLE `collections_auteur`
 ADD PRIMARY KEY (`id`), ADD KEY `nom` (`nom`);

--
-- Index pour la table `collections_auteur_commons`
--
ALTER TABLE `collections_auteur_commons`
 ADD PRIMARY KEY (`auteur_id`,`commons_id`), ADD KEY `commons_id` (`commons_id`);

--
-- Index pour la table `collections_commons`
--
ALTER TABLE `collections_commons`
 ADD PRIMARY KEY (`id`), ADD KEY `serie_id` (`serie_id`), ADD KEY `genre_id` (`genre_id`), ADD KEY `type_id` (`type_id`), ADD KEY `format` (`format`), ADD FULLTEXT KEY `titre` (`titre`);

--
-- Index pour la table `collections_genre`
--
ALTER TABLE `collections_genre`
 ADD PRIMARY KEY (`id`), ADD KEY `type_id` (`type_id`);

--
-- Index pour la table `collections_serie`
--
ALTER TABLE `collections_serie`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `nom` (`nom`,`type_id`), ADD KEY `type_id` (`type_id`);

--
-- Index pour la table `collections_type`
--
ALTER TABLE `collections_type`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `nom` (`nom`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `collections_auteur`
--
ALTER TABLE `collections_auteur`
MODIFY `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT pour la table `collections_commons`
--
ALTER TABLE `collections_commons`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT pour la table `collections_genre`
--
ALTER TABLE `collections_genre`
MODIFY `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT pour la table `collections_serie`
--
ALTER TABLE `collections_serie`
MODIFY `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT pour la table `collections_type`
--
ALTER TABLE `collections_type`
MODIFY `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `collections_auteur_commons`
--
ALTER TABLE `collections_auteur_commons`
ADD CONSTRAINT `collections_auteur_commons_ibfk_1` FOREIGN KEY (`auteur_id`) REFERENCES `collections_auteur` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `collections_auteur_commons_ibfk_2` FOREIGN KEY (`commons_id`) REFERENCES `collections_commons` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `collections_commons`
--
ALTER TABLE `collections_commons`
ADD CONSTRAINT `collections_commons_ibfk_1` FOREIGN KEY (`serie_id`) REFERENCES `collections_serie` (`id`) ON UPDATE CASCADE,
ADD CONSTRAINT `collections_commons_ibfk_2` FOREIGN KEY (`genre_id`) REFERENCES `collections_genre` (`id`) ON UPDATE CASCADE,
ADD CONSTRAINT `collections_commons_ibfk_3` FOREIGN KEY (`type_id`) REFERENCES `collections_type` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `collections_genre`
--
ALTER TABLE `collections_genre`
ADD CONSTRAINT `collections_genre_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `collections_type` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `collections_serie`
--
ALTER TABLE `collections_serie`
ADD CONSTRAINT `collections_serie_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `collections_type` (`id`) ON UPDATE CASCADE;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;
