<?php

namespace App\Models;

//use \PDO as PDO;

class MangaDAO extends CollectionsDAO {

	protected $view = "collections_view_manga";
	protected $types = ['manga','livre'];
	protected $searchItems = ['titre','genre','auteur'];

}