<?php

namespace App\Models;

//use \PDO as PDO;

class BdDAO extends CollectionsDAO {

	protected $view = "collections_view_bd";
	protected $types = ['bd','livre'];

}