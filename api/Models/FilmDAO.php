<?php

namespace App\Models;

class FilmDAO extends CollectionsDAO {

	protected $view = "collections_view_film";
	protected $types = ['film'];
	protected $type = "film";
	protected $searchItems = ['titre','serie','genre','auteurs','format'];
	protected $fillable = ['titre','serie_id','genre_id','couverture','format'];
	protected $validation = [
		'titre' => 'required|min:3|max:100',
		'serie_id' => 'integer|reference:collections_serie,id|validator:getSerie',
		'genre_id' => 'required|integer|reference:collections_genre,id|validator:getGenre',
		'couverture' => 'max:255',
		'format' => 'required|validator:getFormat,nom',
		'auteurs_id' => 'required|array:integer|reference:collections_auteur,id'
	];

	protected function setFormatAttribute($value) {
		return implode(',',$value);
	}

}