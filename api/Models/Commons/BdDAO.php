<?php

namespace App\Models\Commons;

class BdDAO extends CommonsDAO {

	protected $view = "collections_view_bd";
	protected $types = ['bd','livre'];
	protected $type = "bd";
	protected $fillable = ['titre','serie_id','genre_id','couverture','volume'];	
	protected $validation = [
		'titre' => 'required|min:3|max:100',
		'serie_id' => 'without:serie_new|integer|reference:collections_serie,id|validator:getSerie',
		'genre_id' => 'required_without:genre_new|integer|reference:collections_genre,id|validator:getGenre',
		'couverture' => 'max:255',
		'volume' => 'required|integer',
		'auteurs_id' => 'without:auteurs_new|array:integer|reference:collections_auteur,id'
	];	

}