DROP VIEW IF EXISTS `collections_view_bd`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `collections_view_bd` AS select `c`.`id` AS `id`,`c`.`titre` AS `titre`,`c`.`serie_id` AS `serie_id`, `s`.`nom` AS `serie`,`c`.`genre_id` AS `genre_id`, `g`.`nom` AS `genre`,`c`.`couverture` AS `couverture`,`c`.`volume` AS `volume`,`s`.`volume_max` AS `volume_max`,
CONCAT('|',group_concat(`a`.`id` order by `a`.`nom` ASC separator '|'),'|') AS `auteurs_id`,
group_concat(`a`.`nom` order by `a`.`nom` ASC separator ', ') AS `auteurs`, `c`.`metadata`, `c`.`updated_at`, `s`.`updated_at` AS `serie_updated_at`, `g`.`updated_at` AS `genre_updated_at`, MAX(`a`.`updated_at`) AS `auteur_updated_at`
from (((((`collections_commons` `c` left join `collections_serie` `s` on((`c`.`serie_id` = `s`.`id`))) join `collections_genre` `g` on((`c`.`genre_id` = `g`.`id`))) join `collections_type` `t` on((`c`.`type_id` = `t`.`id`))) left join `collections_auteur_commons` `ac` on((`c`.`id` = `ac`.`commons_id`))) left join `collections_auteur` `a` on((`a`.`id` = `ac`.`auteur_id`))) where (`t`.`nom` like 'bd') group by `c`.`id`;

-- --------------------------------------------------------

--
-- Structure de la vue `collections_view_film`
--
DROP VIEW IF EXISTS `collections_view_film`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `collections_view_film` AS select `c`.`id` AS `id`,`c`.`titre` AS `titre`,`c`.`serie_id` AS `serie_id`, `s`.`nom` AS `serie`,`c`.`genre_id` AS `genre_id`, `g`.`nom` AS `genre`,`c`.`couverture` AS `couverture`,`c`.`volume` AS `volume`,`s`.`volume_max` AS `volume_max`,
CONCAT('|',group_concat(`a`.`id` order by `a`.`nom` ASC separator '|'),'|') AS `auteurs_id`,
group_concat(`a`.`nom` order by `a`.`nom` ASC separator ', ') AS `auteurs`, `c`.`metadata`, `c`.`updated_at`, `s`.`updated_at` AS `serie_updated_at`, `g`.`updated_at` AS `genre_updated_at`, MAX(`a`.`updated_at`) AS `auteur_updated_at`
from (((((`collections_commons` `c` left join `collections_serie` `s` on((`c`.`serie_id` = `s`.`id`))) join `collections_genre` `g` on((`c`.`genre_id` = `g`.`id`))) join `collections_type` `t` on((`c`.`type_id` = `t`.`id`))) left join `collections_auteur_commons` `ac` on((`c`.`id` = `ac`.`commons_id`))) left join `collections_auteur` `a` on((`a`.`id` = `ac`.`auteur_id`))) where (`t`.`nom` like 'film') group by `c`.`id`;

-- --------------------------------------------------------

--
-- Structure de la vue `collections_view_manga`
--
DROP VIEW IF EXISTS `collections_view_manga`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `collections_view_manga` AS select `c`.`id` AS `id`,`c`.`titre` AS `titre`,`c`.`genre_id` AS `genre_id`, `g`.`nom` AS `genre`,`c`.`couverture` AS `couverture`,
CONCAT('|',group_concat(`a`.`id` order by `a`.`nom` ASC separator '|'),'|') AS `auteurs_id`,
group_concat(`a`.`nom` order by `a`.`nom` ASC separator ', ') AS `auteurs`, `c`.`metadata`,  `c`.`updated_at`, `g`.`updated_at` AS `genre_updated_at`, MAX(`a`.`updated_at`) AS `auteur_updated_at`
from ((((`collections_commons` `c` join `collections_genre` `g` on((`c`.`genre_id` = `g`.`id`))) join `collections_type` `t` on((`c`.`type_id` = `t`.`id`))) left join `collections_auteur_commons` `ac` on((`c`.`id` = `ac`.`commons_id`))) left join `collections_auteur` `a` on((`a`.`id` = `ac`.`auteur_id`))) where (`t`.`nom` like 'manga') group by `c`.`id`;

-- --------------------------------------------------------

--
-- Structure de la vue `collections_view_romans`
--
DROP VIEW IF EXISTS `collections_view_roman`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `collections_view_roman` AS select `c`.`id` AS `id`,`c`.`titre` AS `titre`,`c`.`serie_id` AS `serie_id`, `s`.`nom` AS `serie`,`c`.`genre_id` AS `genre_id`, `g`.`nom` AS `genre`,`c`.`couverture` AS `couverture`,`c`.`volume` AS `volume`,`s`.`volume_max` AS `volume_max`,
CONCAT('|',group_concat(`a`.`id` order by `a`.`nom` ASC separator '|'),'|') AS `auteurs_id`,
group_concat(`a`.`nom` order by `a`.`nom` ASC separator ', ') AS `auteurs`, `c`.`metadata`, `c`.`updated_at`, `s`.`updated_at` AS `serie_updated_at`, `g`.`updated_at` AS `genre_updated_at`, MAX(`a`.`updated_at`) AS `auteur_updated_at`
from (((((`collections_commons` `c` left join `collections_serie` `s` on((`c`.`serie_id` = `s`.`id`))) join `collections_genre` `g` on((`c`.`genre_id` = `g`.`id`))) join `collections_type` `t` on((`c`.`type_id` = `t`.`id`))) left join `collections_auteur_commons` `ac` on((`c`.`id` = `ac`.`commons_id`))) left join `collections_auteur` `a` on((`a`.`id` = `ac`.`auteur_id`))) where (`t`.`nom` like 'roman') group by `c`.`id`;

-- --------------------------------------------------------

--
-- Structure de la vue `collections_view_total`
--
DROP VIEW IF EXISTS `collections_view_total`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `collections_view_total` AS select `c`.`id` AS `id`,`c`.`titre` AS `titre`,`c`.`serie_id` AS `serie_id`, `s`.`nom` AS `serie`,`c`.`genre_id` AS `genre_id`, `g`.`nom` AS `genre`,`c`.`type_id` AS `type_id`, `t`.`nom` AS `type`,`c`.`couverture` AS `couverture`,`c`.`format` AS `format`,`c`.`volume` AS `volume`,`c`.`volume_possedes` AS `volume_possedes`,`s`.`volume_max` AS `volume_max`,
CONCAT('|',group_concat(`a`.`id` order by `a`.`nom` ASC separator '|'),'|') AS `auteurs_id`,
group_concat(`a`.`nom` order by `a`.`nom` ASC separator ', ') AS `auteurs`, `c`.`metadata` , `c`.`updated_at`, `s`.`updated_at` AS `serie_updated_at`, `g`.`updated_at` AS `genre_updated_at`, MAX(`a`.`updated_at`) AS `auteur_updated_at`
from (((((`collections_commons` `c` left join `collections_serie` `s` on((`c`.`serie_id` = `s`.`id`))) join `collections_genre` `g` on((`c`.`genre_id` = `g`.`id`))) join `collections_type` `t` on((`c`.`type_id` = `t`.`id`))) left join `collections_auteur_commons` `ac` on((`c`.`id` = `ac`.`commons_id`))) left join `collections_auteur` `a` on((`a`.`id` = `ac`.`auteur_id`))) group by `c`.`id`;


INSERT INTO `collections_type` (`id`, `nom`) VALUES(6, 'serietv');
INSERT INTO `collections_type` (`id`, `nom`) VALUES(7, 'video');

DROP VIEW IF EXISTS `collections_view_serietv`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `collections_view_serietv` AS select `c`.`id` AS `id`,`c`.`titre` AS `titre`,`c`.`genre_id` AS `genre_id`, `g`.`nom` AS `genre`,`c`.`couverture` AS `couverture`,
CONCAT('|',group_concat(`a`.`id` order by `a`.`nom` ASC separator '|'),'|') AS `auteurs_id`,
group_concat(`a`.`nom` order by `a`.`nom` ASC separator ', ') AS `auteurs`, `c`.`metadata`,  `c`.`updated_at`, `g`.`updated_at` AS `genre_updated_at`, MAX(`a`.`updated_at`) AS `auteur_updated_at`
from ((((`collections_commons` `c` join `collections_genre` `g` on((`c`.`genre_id` = `g`.`id`))) join `collections_type` `t` on((`c`.`type_id` = `t`.`id`))) left join `collections_auteur_commons` `ac` on((`c`.`id` = `ac`.`commons_id`))) left join `collections_auteur` `a` on((`a`.`id` = `ac`.`auteur_id`))) where (`t`.`nom` like 'serietv') group by `c`.`id`;

