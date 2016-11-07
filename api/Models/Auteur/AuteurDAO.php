<?php

namespace App\Models\Auteur;

use \PDO as PDO;

use App\ValidationTrait;
Use App\Models\CollectionsDAO;

class AuteurDAO extends CollectionsDAO {
	protected $table = "collections_auteur";
	protected $pivot = "collections_auteur_commons";

	protected $searchItems = ['nom'];
	protected $fillable = ['nom'];

	protected $validation = [
		'nom' => 'required|min:3|max:50'
	];

	public function bind($commons_id,$auteurs_ids,$preserve = false) {

		if(!$preserve) {
			$this->exec("DELETE FROM {$this->pivot} WHERE commons_id = $commons_id;");
			//var_dump("DELETE FROM {$this->pivot} WHERE commons_id = $commons_id;");

		}
		
		//var_dump($auteurs_ids); 

		$this->prepare("INSERT INTO {$this->pivot} (auteur_id, commons_id) VALUES (?, $commons_id);");

		foreach ($auteurs_ids as $id) {
			$this->executePreparedStatement([$id]);
		}	
		//die;	
	}
}