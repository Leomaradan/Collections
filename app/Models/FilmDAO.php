<?php

namespace App\Models;

//use \PDO as PDO;

class FilmDAO extends CollectionsDAO {

	protected $view = "collections_view_film";
	protected $types = ['film'];
	protected $searchItems = ['titre','serie','genre','auteur','format'];

}