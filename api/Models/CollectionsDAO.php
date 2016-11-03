<?php

namespace App\Models;

use \PDO as PDO;

use App\ValidationTrait;

class CollectionsDAO extends ConnecteurDAO {

	use ValidationTrait;

	protected $view = "collections_view_total";
	protected $searchItems = ['titre','serie','genre','auteurs'];
	private $type_id = 0;

	public function __construct($base) {
		parent::__construct($base);
		if($this->type) {
			$this->prepare("SELECT id FROM collections_type WHERE nom LIKE '{$this->type}'");

			$this->executePreparedStatement();

			$this->type_id = $this->fetch(PDO::FETCH_NUM)[0];			
		}
	
	}

	private function requestSingle($query, $args = []) {
		$this->prepare($query);

		$this->executePreparedStatement($args);

		return [$this->fetch(PDO::FETCH_ASSOC)];		
	}

	private function requestMultiple($query, $args = []) {
		$this->prepare($query);

		$this->executePreparedStatement($args);

		return $this->fetchAll(PDO::FETCH_ASSOC);	
	}	

	public function getAll() {
		return $this->requestMultiple("SELECT SQL_CACHE * FROM {$this->view}");
	}

	public function getById($id) {
		return $this->requestSingle("SELECT SQL_CACHE * FROM {$this->view} WHERE id = ? LIMIT 1", [$id]);
	}

	public function getByGenre($genre) {
		return $this->requestMultiple("SELECT SQL_CACHE * FROM {$this->view} WHERE genre_id = ?", [$genre]);
	}

	public function getByAuteur($auteur) {
		return $this->requestMultiple("SELECT SQL_CACHE * FROM {$this->view} WHERE auteurs LIKE ?", ['%'.$auteur.'%']);
	}

	public function getBySerie($serie) {
		return $this->requestMultiple("SELECT SQL_CACHE * FROM {$this->view} WHERE serie_id = ?", [$serie]);
	}

	public function getByNullSerie() {
		return $this->requestMultiple("SELECT SQL_CACHE * FROM {$this->view} WHERE serie_id IS NULL");
	}	

	public function getSerie() {
		if(isset($this->types)) {
			$types = implode("','",$this->types);
			$sql = "SELECT SQL_CACHE `s`.* FROM `collections_serie` AS s LEFT JOIN `collections_type` AS t ON (s.type_id = t.id) WHERE t.nom IN ('$types') OR s.type_id IS NULL;";
		} else {
			$sql = "SELECT SQL_CACHE `s`.* FROM `collections_serie` AS s LEFT JOIN `collections_type` AS t ON (s.type_id = t.id);";
		}

		return $this->requestMultiple($sql);
	
	}

	public function getGenre() {
		if(isset($this->types)) {
			$types = implode("','",$this->types);
			$sql = "SELECT SQL_CACHE `g`.* FROM `collections_genre` AS g LEFT JOIN `collections_type` AS t ON (g.type_id = t.id) WHERE t.nom IN ('$types') OR g.type_id IS NULL;";
		} else {
			$sql = "SELECT SQL_CACHE `g`.* FROM `collections_genre` AS g LEFT JOIN `collections_type` AS t ON (g.type_id = t.id);";
		}

		return $this->requestMultiple($sql);	
	}	

	public function search($query) {

		$filter = array_intersect_key($query,array_flip($this->searchItems));

		if(count($filter) == 0) {
			return [];
		}

		$keys = array_keys($filter); // get the keys from the array

		array_walk($keys, function(&$item) { $item = "$item LIKE :$item"; }); // each key is transformed into 'key LIKE :key' 

		$filter = array_combine(
			array_map(function($k){ return ':'.$k; }, array_keys($filter)),
			array_map(function(&$v) { return "%$v%"; }, $filter)
		); // merge the array -> [':key' => %value%]

		$q = implode(' AND ', $keys); // join keys into a string

		return $this->requestMultiple("SELECT SQL_CACHE * FROM {$this->view} WHERE $q;", $filter);
	}	


	public function create($data) {


		$filter = array_intersect_key($data,array_flip($this->fillable));

		if(count($filter) == 0) {
			return [];
		}

		$filter['type_id'] = $this->type_id;

		$values_k = $keys = array_keys($filter);

		array_walk($values_k, function(&$item) { $item = ":$item"; });
		array_walk($filter, function(&$item, $key) use ($data) { $item = $this->mutatorSetValue($key, $item, $data); });

		$filter = array_combine(
			array_map(function($k){ return ':'.$k; }, array_keys($filter)),
			$filter
		);	

		$keys = implode(', ', $keys);
		$fieldBind = implode(', ', $values_k);

	
		$this->prepare("INSERT INTO `collections_commons` ($keys) VALUES ($fieldBind);");

		$this->executePreparedStatement($filter);	

		return ['id' => $this->lastId()];
	}

	public function update($id, $data) {
		$filter = array_intersect_key($data,array_flip($this->fillable));

		if(count($filter) == 0) {
			return [];
		}

		$keys = array_keys($filter);

		array_walk($keys, function(&$item) { $item = "$item = :$item"; });		
		array_walk($filter, function(&$item, $key) use ($data) { $item = $this->mutatorSetValue($key, $item, $data); });

		$filter['id'] = $id;

		$filter = array_combine(
			array_map(function($k){ return ':'.$k; }, array_keys($filter)),
			$filter
		);

		$field = implode(', ', $keys);

	
		$this->prepare("UPDATE `collections_commons` SET $field WHERE id = :id LIMIT 1;");

		$this->executePreparedStatement($filter);

		return ['id' => $id];
	}	

	public function delete($id) {
		$this->prepare("DELETE FROM `collections_commons` WHERE id = ? LIMIT 1;");

		$this->executePreparedStatement([$id]);
	}

	public function mutatorGetValue($field, $value, $array) {
		$name = 'get'.ucfirst($field).'Attribute';
		if(method_exists($this, $name)) {
			return $this->$name($value, $array);
		}

		return $value;
		
	}

	public function mutatorSetValue($field, $value, $array) {
		$name = 'set'.ucfirst($field).'Attribute';
		if(method_exists($this, $name)) {
			return $this->$name($value, $array);
		}

		return $value;
	}


}
