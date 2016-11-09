<?php

namespace App\Models;

use \PDO as PDO;

use App\ValidationTrait;

abstract class CollectionsDAO extends ConnecteurDAO {

	use ValidationTrait;

	public function __construct(ConnecteurDAO $connection = null) {
		parent::__construct($connection);
		if(!isset($this->view) && isset($this->table)) {
			$this->view = $this->table;		
		}
	
	}	

	protected function requestSingle($query, $args = []) {
		$this->prepare($query);

		$this->executePreparedStatement($args);

		return $this->mutatorGetsValue([$this->fetch(PDO::FETCH_ASSOC)]);		
	}

	protected function requestMultiple($query, $args = []) {
		$this->prepare($query);

		$this->executePreparedStatement($args);

		return $this->mutatorGetsValue($this->fetchAll(PDO::FETCH_ASSOC));	
	}	

	public function getAll() {
		return $this->requestMultiple("SELECT SQL_CACHE * FROM {$this->view}");
	}

	public function getById($id) {
		return $this->requestSingle("SELECT SQL_CACHE * FROM {$this->view} WHERE id = ? LIMIT 1", [$id]);
	
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


	public function create($data, $extraData = null) {


		$filter = array_intersect_key($data,array_flip($this->fillable));

		if(count($filter) == 0) {
			return [];
		}

		if(is_array($extraData)) {
			$filter = array_merge($filter, $extraData);
		}

		$values_k = $keys = array_keys($filter);

		array_walk($values_k, function(&$item) { $item = ":$item"; });
		array_walk($filter, function(&$item, $key) use ($data) { $item = $this->mutatorSetValue($key, $item, $data); });

		$filter = array_combine(
			array_map(function($k){ return ':'.$k; }, array_keys($filter)),
			$filter
		);	

		$keys = implode(', ', $keys);
		$fieldBind = implode(', ', $values_k);
	
		$this->prepare("INSERT INTO {$this->table} ($keys) VALUES ($fieldBind);");

		$this->executePreparedStatement($filter);	

		return ['id' => $this->lastId()];
	}

	public function update($id, $data, $extraData = null) {
		$filter = array_intersect_key($data,array_flip($this->fillable));

		if(count($filter) == 0) {
			return [];
		}

		if(is_array($extraData)) {
			$filter = array_merge($filter, $extraData);
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

	
		$this->prepare("UPDATE {$this->table} SET $field WHERE id = :id LIMIT 1;");

		$this->executePreparedStatement($filter);

		return ['id' => $id];
	}	

	public function delete($id) {
		$this->prepare("DELETE FROM {$this->table} WHERE id = ? LIMIT 1;");

		$this->executePreparedStatement([$id]);
	}

	public function mutatorGetValue($field, $value, $array) {
		$name = 'get'.$this->SnakeCase($field).'Attribute';
		if(method_exists($this, $name)) {
			return $this->$name($value, $array);
		}

		return $value;
		
	}

	public function mutatorGetsValue($array) {
		if($array === false) {
			return [];
		}
		foreach ($array as $row => $cols) {
			if($cols == false) {
				return [];
			}
			foreach ($cols as $field => $value) {
				if(isset($this->visible)) {
					//var_dump($field);
					if(in_array($field, $this->visible)) {
						$array[$row][$field] = $this->mutatorGetValue($field, $array[$row][$field], $cols);
					} elseif($field !== 'id') {
						unset($array[$row][$field]);
					}
				} else {
					$array[$row][$field] = $this->mutatorGetValue($field, $array[$row][$field], $cols);
				}
				
			}
		}	

		return $array;
	}	

	public function mutatorSetValue($field, $value, $array) {
		$name = 'set'.$this->SnakeCase($field).'Attribute';
		if(method_exists($this, $name)) {
			return $this->$name($value, $array);
		}

		return $value;
	}

	protected function SnakeCase($string) {
		return str_replace("_", "", ucwords($string, "_"));
	}


}
