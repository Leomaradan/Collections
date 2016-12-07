<?php

namespace App\Models\Commons;

use CollectionCompact\Compact;

class SerieTVDAO extends CommonsDAO {

	protected $view = "collections_view_serietv";
	protected $types = ['serietv','video'];
	protected $type = "serietv";
	protected $searchItems = ['titre','genre','auteurs'];
	protected $visible = ['titre','genre','auteurs','volume_possedes','volume_max','format', 'vue','couverture'];

	protected $supfield = ["volume_possedes", "volume_max", "format", 'vue'];

	protected $fillable = ['titre','genre_id','metadata','couverture'];
	protected $validation = [
		'titre' => 'required|min:3|max:100',
		'genre_id' => 'require_only:genre_new|integer|reference:collections_genre,id|validator:getGenre',
		'couverture' => 'max:255',
		'volume_possedes' => 'required|array:integer',
		'volume_max' => 'required|integer',
		'format' => 'required|array|validator:getFormat,nom',
		'vue' => 	'boolean:false',
		'auteurs_id' => 'require_without:auteurs_new|array:integer|reference:collections_auteur,id'
	];	


	public function setMetadataAttribute($value,$array) {
		$meta = json_decode($value);
		$meta->volumePossedes = Compact::compact($array['volume_possedes']);
		$meta->volumeMax = $array['volume_max'];
		$meta->format = $array['format'];
		$meta->vue = !!$array['vue'];
		return json_encode($meta);
	}


	public function getVolumePossedesAttribute($value,$array) {

		$meta = json_decode($array['metadata']);

		if(isset($meta->volumePossedes)) {
			return $meta->volumePossedes;
		}

		return [];		
	}

	public function getVolumeMaxAttribute($value,$array) {

		$meta = json_decode($array['metadata']);

		if(isset($meta->volumeMax)) {
			return $meta->volumeMax;
		}

		return 1;
	}

	protected function getFormatAttribute($value, $array) {
		$meta = json_decode($array['metadata']);

		if(isset($meta->format)) {
			return $meta->format;
		}

		return [];			
	}	


	protected function getVueAttribute($value, $array) {
		$meta = json_decode($array['metadata']);

		if(isset($meta->vue)) {
			return $meta->vue;
		}

		return false;			
	}

	public function getByFormat($format, $pagination) {

        $result = [];

		$where = "metadata LIKE ?";
		$pattern = '%format":[%'.$format.'%]%';
        $result['data'] = $this->requestMultiple($this->getQuery(['where' => $where, 'pagination' => $pagination]), [$pattern]);

        $this->addPagination($pagination, $result, $where, [$pattern]);


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