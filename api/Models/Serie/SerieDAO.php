<?php

namespace App\Models\Serie;

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

	public function getByType($types = null) {
		if($types) {
			$types = implode("','",$types);
			$sql = "SELECT SQL_CACHE `g`.* FROM {$this->table} AS g LEFT JOIN `collections_type` AS t ON (g.type_id = t.id) WHERE t.nom IN ('$types') OR g.type_id IS NULL;";
		} else {
			$sql = "SELECT SQL_CACHE `g`.* FROM {$this->table} AS g LEFT JOIN `collections_type` AS t ON (g.type_id = t.id);";
		}

		return $this->requestMultiple($sql);
	}	
}