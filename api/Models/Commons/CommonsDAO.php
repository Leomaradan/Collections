<?php

namespace App\Models\Commons;

use \PDO as PDO;
Use App\Models\CollectionsDAO;
Use App\Models\Genre\GenreDAO;
Use App\Models\Serie\SerieDAO;
Use App\Models\Auteur\AuteurDAO;


class CommonsDAO extends CollectionsDAO {

	protected $view = "collections_view_total";
	protected $table = "collections_commons";
	protected $searchItems = ['titre','serie','genre','auteurs'];
	protected $type_id = 0;

	public function __construct(ConnecteurDAO $connection = null) {
		parent::__construct($connection);
		if($this->type) {
			$this->prepare("SELECT id FROM collections_type WHERE nom LIKE '{$this->type}'");

			$this->executePreparedStatement();

			$this->type_id = $this->fetch(PDO::FETCH_NUM)[0];			
		}
	
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

	public function create($data, $extraData = null) {

		// Pre-Action
		if(is_array($extraData)) {
			$extraData = array_merge($extraData, ['type_id' => $this->type_id]);
		} else {
			$extraData = ['type_id' => $this->type_id];
		}	

		if(isset($data['genre_new'])) {

			$result = $this->addGenre($data['genre_new'], $extraData);

			if($result !== true) {
				return $result;
			}	
		}

		if(isset($data['serie_new'])) {

			$result = $this->addSerie($data['serie_new'], $extraData);

			if($result !== true) {
				return $result;
			}	
		}	

		if(isset($data['auteurs_new'])) {
			//var_dump($data);
			$auteurs = $this->addAuteurs($data['auteurs_new'], $extraData);
			//var_dump($auteurs); die;
		}

		// Action
		$result = parent::create($data, $extraData);


		// Post-Action
		$preserveAuteurs = false;
		if(isset($data['auteurs_id'])) {

			if(isset($auteurs)) {
				$dao = $auteurs['auteursDAO'];
			} else {
 				$dao = new AuteurDAO($this);
			}
			
			$dao->bind($result['id'],$data['auteurs_id']);
			$preserveAuteurs = true;
						

		}	

		if(isset($data['auteurs_new'])) {

			if(count($auteurs['ids']) > 0) {
				// need to bind
				$auteurs['auteursDAO']->bind($result['id'],$auteurs['ids'],$preserveAuteurs);
			}

		}
	

		return $result;
	}

	public function update($id, $data, $extraData = null) {

		// Pre-Action
		if(is_array($extraData)) {
			$extraData = array_merge($extraData, ['type_id' => $this->type_id]);
		} else {
			$extraData = ['type_id' => $this->type_id];
		}	

		if(isset($data['genre_new'])) {

			$result = $this->addGenre($data['genre_new'], $extraData);

			if($result !== true) {
				return $result;
			}	
		}

		if(isset($data['serie_new'])) {

			$result = $this->addSerie($data['serie_new'], $extraData);

			if($result !== true) {
				return $result;
			}	
		}	

		if(isset($data['auteurs_new'])) {
			//var_dump($data);
			$auteurs = $this->addAuteurs($data['auteurs_new'], $extraData);
			//var_dump($auteurs); die;
		}

		// Action
		$result = parent::update($id, $data, $extraData);


		// Post-Action
		$preserveAuteurs = false;
		if(isset($data['auteurs_id'])) {

			if(isset($auteurs)) {
				$dao = $auteurs['auteursDAO'];
			} else {
 				$dao = new AuteurDAO($this);
			}
			
			$dao->bind($id,$data['auteurs_id']);
			$preserveAuteurs = true;
						

		}

		if(isset($data['auteurs_new'])) {

			if(count($auteurs['ids']) > 0) {
				// need to bind
				$auteurs['auteursDAO']->bind($id,$auteurs['ids'], $preserveAuteurs);
			}

		}
		

		return $result;
	}

	protected function addGenre($genre_new, &$extraData) {

		$genre = new GenreDAO($this);
		$validation = $genre->validate($genre_new);
		if($validation === true) {
			$id = $genre->create($genre_new)['id'];
			$extraData['genre_id'] = $id;
		} else {
			return $validation;
		}	

		return true;		
	}

	protected function addSerie($serie_new, &$extraData) {

		$serie = new SerieDAO($this);
		$validation = $serie->validate($serie_new);
		if($validation === true) {
			$id = $serie->create($serie_new)['id'];
			$extraData['serie_id'] = $id;
		} else {
			return $validation;
		}	

		return true;		
	}	

	protected function addAuteurs($auteurs_new, &$extraData) {

		$auteursDAO = new AuteurDAO($this);

		if(!is_array($auteurs_new)) {
			$auteurs_new = [$auteurs_new];
		}

		$ids = [];
		$message = [];

		foreach ($auteurs_new as $auteur_new) {
			$validation = $auteursDAO->validate($auteur_new);

			if($validation === true) {
				$ids[] = $auteursDAO->create($auteur_new)['id'];
			} else {
				$message[] = $validation;
			}				
		}

		return compact('ids','message','auteursDAO');		
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
}
