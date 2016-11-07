<?php

namespace App\Models\Commons;

class MangaDAO extends CommonsDAO {

	protected $view = "collections_view_manga";
	protected $types = ['manga','livre'];
	protected $type = "manga";
	protected $searchItems = ['titre','genre','auteurs'];
	protected $visible = ['titre','genre','auteurs','volume_possedes','couverture'];
	protected $fillable = ['titre','genre_id','volume_possedes','couverture'];
	protected $validation = [
		'titre' => 'required|min:3|max:100',
		'genre_id' => 'required_without:genre_new|integer|reference:collections_genre,id|validator:getGenre',
		'couverture' => 'max:255',
		'volume_possedes' => 'required|array:integer',
		'volume_max' => 'required|integer',
		'auteurs_id' => 'without:auteurs_new|array:integer|reference:collections_auteur,id'
	];	


	public function setVolumePossedesAttribute($value,$array) {
		return $this->compactVolumes($value) . '/' . $array['volume_max'];
	}

	public function compactVolumes($volumes) {
		sort($volumes);

		$current = current($volumes);
		$min = current($volumes);
		$max = max($volumes);

		$string = $current;

		$mode = 'unique';

		for($i = $min + 1; $i <= $max; $i++) {

			if($mode == 'unique') {
				if(in_array($i,$volumes)) {
					$mode = 'follow';
				} else {
					$mode = 'break';
				}
			} elseif($mode == 'follow' && !in_array($i,$volumes)) {
				$string .= ('-' . ($i - 1));
				$mode = 'break';
			} elseif($mode == 'break') {
				if(in_array($i,$volumes)) {
					$mode = 'unique';
					$string .= (',' . $i);
				}				
			}

			if($i == $max && $mode == 'follow') {
				$string .= ('-' . $i);
			}
		}

		return $string;
	}

}