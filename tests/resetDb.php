<?php

require '../vendor/autoload.php';

$dao = new App\Models\ConnecteurDAO();

$empty = "SET FOREIGN_KEY_CHECKS=0; 
START TRANSACTION; 
DROP TABLE `collections_auteur`, `collections_auteur_commons`, `collections_commons`, `collections_genre`, `collections_serie`, `collections_type`;
DROP VIEW `collections_view_bd`, `collections_view_film`, `collections_view_manga`, `collections_view_roman`, `collections_view_total`;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;";

$create_table = file_get_contents('../install/database.sql');
$seeds = file_get_contents('../install/seeds.sql');

$dao->exec($empty);

$dao->exec($create_table);

$dao->exec($seeds);

echo "done";