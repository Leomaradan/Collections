<?php

namespace App\Models\Commons;

class RomanDAO extends CommonsDAO {

	protected $view = "collections_view_roman";
	protected $types = ['roman','livre'];
	protected $type = "roman";
	protected $fillable = ['titre','serie_id','genre_id','couverture','volume'];	
	protected $validation = [
		'titre' => 'required|min:3|max:100',
		'serie_id' => 'without:serie_new|integer|reference:collections_serie,id|validator:getSerie',
		'genre_id' => 'require_only:genre_new|integer|reference:collections_genre,id|validator:getGenre',
		'couverture' => 'max:255',
		'volume' => 'required|integer',
		'auteurs_id' => 'require_without:auteurs_new|array:integer|reference:collections_auteur,id'
	];	

}