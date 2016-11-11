<?php

namespace App\Models\Commons;

class MangaDAO extends CommonsDAO {

	protected $view = "collections_view_manga";
	protected $types = ['manga','livre'];
	protected $type = "manga";
	protected $searchItems = ['titre','genre','auteurs'];
	protected $visible = ['titre','genre','auteurs','volume_possedes','volume_max','couverture'];

	protected $supfield = "volume_max";

	protected $fillable = ['titre','genre_id','volume_possedes','couverture'];
	protected $validation = [
		'titre' => 'required|min:3|max:100',
		'genre_id' => 'require_only:genre_new|integer|reference:collections_genre,id|validator:getGenre',
		'couverture' => 'max:255',
		'volume_possedes' => 'required|array:integer',
		'volume_max' => 'required|integer',
		'auteurs_id' => 'require_without:auteurs_new|array:integer|reference:collections_auteur,id'
	];	


	public function setVolumePossedesAttribute($value,$array) {
		return $this->compactVolumes($value) . '/' . $array['volume_max'];
	}

	public function getVolumePossedesAttribute($value,$array) {
		$arr = explode('/',$value);
		if(count($arr) == 2) {
			return $arr[0];
		}
		return '';
	}

	public function getVolumeMaxAttribute($value,$array) {
		$arr = explode('/',$array['volume_possedes']);
		return $arr[1];
	}

	public function compactVolumes($volumes) {
		if(count($volumes) == 0) {
			return '';
		}
		sort($volumes);

		$current = current($volumes);
		$min = current($volumes);

		if($min < 1) {
			$min = 1;
		}

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