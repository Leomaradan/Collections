<?php

namespace App\Models;

use \PDO as PDO;
use App\ValidationTrait;

abstract class CollectionsDAO extends ConnecteurDAO {

    use ValidationTrait;
    
    protected $titleField = "titre";

    protected $supfield = null;

    public function __construct(ConnecteurDAO $connection = null) {
        parent::__construct($connection);
        if (!isset($this->view) && isset($this->table)) {
            $this->view = $this->table;
        }
    }

    protected function requestSingle($query, $args = []) {
        $this->prepare($query);

        $this->executePreparedStatement($args);

        return current($this->mutatorGetsValue([$this->fetch(PDO::FETCH_ASSOC)]));
    }

    protected function requestMultiple($query, $args = []) {
        $this->prepare($query);

        $this->executePreparedStatement($args);

        return $this->mutatorGetsValue($this->fetchAll(PDO::FETCH_ASSOC));
    }

    public function getAll($pagination) {
        //$paginate = false;
        $result = [];


        $result['data'] = $this->requestMultiple($this->getQuery(['pagination' => $pagination]));

        $this->addPagination($pagination, $result);


        return $result;
    }

    public function getById($id) {
        $add_fields = '';

        if ($this->supfield !== null) {
            if (!is_array($this->supfield)) {
                $this->supfield = [$this->supfield];
            }

            foreach ($this->supfield as $supfield) {
                $add_fields .= ",'' as $supfield";
            }
        }

        $result = ['data' => $this->requestSingle($this->getQuery(['where' => "id = ?", 'single' => true]), [$id])];

        return $result;
    }

    public function getCountItems($where = null, $args = []) {

        $whereRequest = '';

        if($where !== null) {
            $whereRequest = "WHERE $where";
        }

        //$data = $this->requestSingle();

        $this->prepare("SELECT SQL_CACHE count(*) AS count FROM {$this->view} $whereRequest");

        $this->executePreparedStatement($args);

        $data = $this->fetch(PDO::FETCH_ASSOC);        

        //var_dump($data);

        return $data['count'];
    }

    public function search($query, $pagination) {

        $filter = array_intersect_key($query, array_flip($this->searchItems));

        if (count($filter) == 0) {
            return [];
        }

        $keys = array_keys($filter); // get the keys from the array

        array_walk($keys, function(&$item) {
            $item = "$item LIKE :$item";
        }); // each key is transformed into 'key LIKE :key' 

        $args = array_combine(
                array_map(function($k) {
                    return ':' . $k;
                }, array_keys($filter)), array_map(function(&$v) {
                    return "%$v%";
                }, $filter)
        ); // merge the array -> [':key' => %value%]

        $q = implode(' AND ', $keys); // join keys into a string

        $add_fields = '';

        if ($this->supfield !== null) {
            if (!is_array($this->supfield)) {
                $this->supfield = [$this->supfield];
            }

            foreach ($this->supfield as $supfield) {
                $add_fields .= ",'' as $supfield";
            }
        }

        $result = [];


        $result['data'] = $this->requestMultiple($this->getQuery(['where' => $q, 'pagination' => $pagination]), $args);

        $this->addPagination($pagination, $result, $q, $args);


        return $result;

        //return $this->requestMultiple($this->getQuery(['where' => $q]), $args);
    }

    protected function addPagination($pagination, &$result, $where = null, $args = []) {

        if (isset($pagination['page'])) {

            $result['pagination'] = [];
            $nb_elem_page = count($result['data']);
            $perPage = $pagination['perPage'];
            $offset = $pagination['offset'];

            if ($nb_elem_page == $perPage) {
                // Il reste des pages
                $result['pagination']['nextpage'] = true; 
            }

            if ($offset !== 0) {
                $result['pagination']['previouspage'] = true;
            }

            $result['pagination']['page'] = +$pagination['page'] + 1;
            $result['pagination']['perPage'] = +$perPage;
            $result['pagination']['nb_items'] = $this->getCountItems($where, $args);
            $result['pagination']['nb_pages'] = ceil($result['pagination']['nb_items'] / $perPage);
            
        }

        $result['request'] = $pagination['request'];

        
    }

    //protected function getQuery($where = null, $single = false) {
    protected function getQuery($args = []) {

        $where = null;
        $single = '';
        $pagination = [];
        $orderRequest = $this->titleField;
        $order = null;

        extract($args, EXTR_IF_EXISTS);

        $paginateRequest = '';
        $whereRequest = '';

        if($single) {
        	$paginateRequest = "LIMIT 1";
        }

        if (isset($pagination['perPage'])) {
            $perPage = $pagination['perPage'];
            if($pagination['page'] > 0) {
                $offset = $pagination['offset'];
                $paginateRequest = "LIMIT $offset,$perPage";
            } else {
                $paginateRequest = "LIMIT $perPage";
            } 
        }

        if($where !== null) {
			$whereRequest = "WHERE $where";
        }

        if($order !== null) {
            $orderRequest = "$order,$orderRequest";
        }    


        $add_fields = '';

        if ($this->supfield !== null) {
            if (!is_array($this->supfield)) {
                $this->supfield = [$this->supfield];
            }

            foreach ($this->supfield as $supfield) {
                $add_fields .= ",'' as $supfield";
            }
        }
//var_dump("SELECT SQL_CACHE * $add_fields FROM {$this->view} $whereRequest ORDER BY {$this->titleField} $paginateRequest"); die();
        return "SELECT SQL_CACHE * $add_fields FROM {$this->view} $whereRequest ORDER BY $orderRequest $paginateRequest";   	
    }

    public function create($data, $extraData = null) {


        $filter = array_intersect_key($data, array_flip($this->fillable));

        if (count($filter) == 0) {
            return [];
        }

        if (is_array($extraData)) {
            $filter = array_merge($filter, $extraData);
        }

        $values_k = $keys = array_keys($filter);

        array_walk($values_k, function(&$item) {
            $item = ":$item";
        });
        array_walk($filter, function(&$item, $key) use ($data) {
            $item = $this->mutatorSetValue($key, $item, $data);
        });

        $args = array_combine(
                array_map(function($k) {
                    return ':' . $k;
                }, array_keys($filter)), $filter
        );

        $keys = implode(', ', $keys);
        $fieldBind = implode(', ', $values_k);

        $this->prepare("INSERT INTO {$this->table} ($keys) VALUES ($fieldBind);");

        $this->executePreparedStatement($args);

        return ['id' => $this->lastId()];
    }

    public function update($id, $data, $extraData = null) {
        $filter = array_intersect_key($data, array_flip($this->fillable));

        if (count($filter) == 0) {
            return [];
        }

        if (is_array($extraData)) {
            $filter = array_merge($filter, $extraData);
        }

        $keys = array_keys($filter);

        array_walk($keys, function(&$item) {
            $item = "$item = :$item";
        });
        array_walk($filter, function(&$item, $key) use ($data) {
            $item = $this->mutatorSetValue($key, $item, $data);
        });

        $filter['id'] = $id;

        $args = array_combine(
                array_map(function($k) {
                    return ':' . $k;
                }, array_keys($filter)), $filter
        );

        $field = implode(', ', $keys);


        $this->prepare("UPDATE {$this->table} SET $field WHERE id = :id LIMIT 1;");

        $this->executePreparedStatement($args);

        return ['id' => $id];
    }

    public function delete($id) {
        $this->prepare("DELETE FROM {$this->table} WHERE id = ? LIMIT 1;");

        $this->executePreparedStatement([$id]);
    }

    public function mutatorGetValue($field, $value, $array) {
        $name = 'get' . $this->SnakeCase($field) . 'Attribute';
        if (method_exists($this, $name)) {
            return $this->$name($value, $array);
        }

        return $value;
    }

    public function mutatorGetsValue($array) {
        if ($array === false) {
            return [];
        }
        foreach ($array as $row => $cols) {
            if ($cols == false) {
                return [];
            }
            foreach ($cols as $field => $value) {
                if (isset($this->visible)) {

                    if (in_array($field, $this->visible)) {
                        $array[$row][$field] = $this->mutatorGetValue($field, $array[$row][$field], $cols);
                    } elseif ($field !== 'id') {
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
        $name = 'set' . $this->SnakeCase($field) . 'Attribute';
        if (method_exists($this, $name)) {
            return $this->$name($value, $array);
        }

        return $value;
    }

    protected function SnakeCase($string) {
        return str_replace("_", "", ucwords($string, "_"));
    }

}
