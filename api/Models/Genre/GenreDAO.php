<?php

namespace App\Models\Genre;

use \PDO as PDO;

use App\ValidationTrait;
Use App\Models\CollectionsDAO;

class GenreDAO extends CollectionsDAO {
	protected $table = "collections_genre";

	protected $searchItems = ['nom','type_id'];
	protected $fillable = ['nom','type_id'];
	
	protected $validation = [
		'nom' => 'required|min:3|max:50',
		'type_id' => 'integer|reference:collections_type,id'
	];
}