<?php

namespace App\Models\Commons;

class FilmDAO extends CommonsDAO {

	protected $view = "collections_view_film";
	protected $types = ['film'];
	protected $type = "film";
	protected $searchItems = ['titre','serie','genre','auteurs','format'];
	protected $visible = ['titre','serie','genre','auteurs','format','couverture'];
	protected $fillable = ['titre','serie_id','genre_id','couverture','format'];
	protected $validation = [
		'titre' => 'required|min:3|max:100',
		'serie_id' => 'without:serie_new|integer|reference:collections_serie,id|validator:getSerie',
		'genre_id' => 'require_only:genre_new|integer|reference:collections_genre,id|validator:getGenre',
		'couverture' => 'max:255',
		'format' => 'required|array|validator:getFormat,nom',
		'auteurs_id' => 'require_without:auteurs_new|array:integer|reference:collections_auteur,id'
	];

	protected function setFormatAttribute($value, $array) {
		return implode(',',$value);
	}

	protected function getFormatAttribute($value, $array) {
		return explode(',',$value);
	}	

	public function getByFormat($format, $pagination) {

        $result = [];

		$where = "FIND_IN_SET(?, format)";
        $result['data'] = $this->requestMultiple($this->getQuery(['where' => $where, 'pagination' => $pagination]), [$format]);

        $this->addPagination($pagination, $result, $where, [$format]);


        return $result;
     

	}	

	public function getFormat() {
		return [
			['nom' => 'dvd', 'valeur' => 'DVD'],
			['nom' => 'blu-ray', 'valeur' => 'Blu-Ray'],
			['nom' => 'blu-ray 3d', 'valeur' => 'Blu-Ray 3D'],
			['nom' => 'blu-ray 4k', 'valeur' => 'Blu-Ray 4K']
		];

	}

}