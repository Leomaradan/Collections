<?php

namespace App\Models\Commons;

use CollectionCompact\Compact;

class MangaDAO extends CommonsDAO {

	protected $view = "collections_view_manga";
	protected $types = ['manga','livre'];
	protected $type = "manga";
	protected $searchItems = ['titre','genre','auteurs'];
	protected $visible = ['titre','genre','auteurs','volume_possedes','volume_max','serie_termine', 'serie_abandonne','couverture'];

	protected $supfield = ['volume_possedes', 'volume_max', 'serie_termine', 'serie_abandonne'];

	protected $fillable = ['titre','genre_id','metadata','couverture'];
	protected $validation = [
		'titre' => 'required|min:3|max:100',
		'genre_id' => 'require_only:genre_new|integer|reference:collections_genre,id|validator:getGenre',
		'couverture' => 'max:255',
		'volume_possedes' => 'required|array:integer',
		'volume_max' => 'required|integer',
		'serie_termine' => 'boolean:false',
		'serie_abandonne' => 'boolean:false',
		'auteurs_id' => 'require_without:auteurs_new|array:integer|reference:collections_auteur,id'
	];	


	public function setMetadataAttribute($value,$array) {
		$meta = json_decode($value);

		$meta->volumePossedes = Compact::compact($array['volume_possedes']);
		$meta->volumeMax = $array['volume_max'];

		$meta->termine = !!$array['serie_termine'];
		$meta->abandonne = !!$array['serie_abandonne'];
                $meta->complete = (max($array['volume_possedes']) == $array['volume_max']);
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

	public function getSerieTermineAttribute($value,$array) {

		$meta = json_decode($array['metadata']);

		if(isset($meta->termine)) {
			return $meta->termine;
		}

		return false;
	}	

	public function getSerieAbandonneAttribute($value,$array) {

		$meta = json_decode($array['metadata']);

		if(isset($meta->abandonne)) {
			return $meta->abandonne;
		}

		return false;
	}	
        
        public function getByShoppingList($pagination) {

            $result = [];

            $where = "metadata LIKE :nonabandonne AND ((metadata LIKE :termine AND metadata NOT LIKE :complete) OR metadata NOT LIKE :termine)";
            $nonabandonne = '%abandonne":false%';
            $termine = '%termine":true%';
            $complete = '%complete":true%';
            
            $params = ['nonabandonne' => $nonabandonne, 'termine' => $termine, 'complete' => $complete];
            
            $result['data'] = $this->requestMultiple($this->getQuery(['where' => $where, 'pagination' => $pagination]), $params);

            $this->addPagination($pagination, $result, $where, $params);  
            
            return $result;

        }        

}