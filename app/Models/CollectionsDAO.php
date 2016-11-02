<?php

namespace App\Models;

use \PDO as PDO;

class CollectionsDAO extends ConnecteurDAO {

	protected $view = "collections_view_total";
	protected $searchItems = ['titre','serie','genre','auteur'];

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

		$keys = array_keys($filter);

		array_walk($keys, function(&$item) { $item = "$item LIKE :$item"; });

		$filter = array_combine(
			array_map(function($k){ return ':'.$k; }, array_keys($filter)),
			array_map(function(&$v) { return "%$v%"; }, $filter)
		);

		$q = implode(' AND ', $keys);

		return $this->requestMultiple("SELECT SQL_CACHE * FROM {$this->view} WHERE $q;", $filter);
	}	
}
