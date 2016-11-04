<?php

namespace App\Models\Genre;

use \PDO as PDO;

use App\ValidationTrait;
Use App\Models\CollectionsDAO;

class SerieDAO extends CollectionsDAO {
	protected $table = "collections_serie";

	protected $searchItems = ['nom','type_id','volume_max'];
	protected $fillable = ['nom','type_id','volume_max'];
	
	protected $validation = [
		'nom' => 'required|min:3|max:50',
		'type_id' => 'integer|reference:collections_type,id',
		'volume_max' => 'required|integer|min:0|max:255'
	];
}