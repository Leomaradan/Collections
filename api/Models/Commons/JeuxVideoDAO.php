<?php

namespace App\Models\Commons;

//use CollectionCompact\Compact;

class JeuxVideoDAO extends CommonsDAO {

	protected $view = "collections_view_jeuxvideo";
	protected $types = ['jv'];
	protected $type = "jv";
	protected $searchItems = ['titre','genre','console','editeur','serie'];
	protected $visible = ['titre','genre','console','editeur','serie','couverture'];

	protected $supfield = ['console','editeur'];

	protected $fillable = ['titre','genre_id','serie_id','metadata','couverture'];
	protected $validation = [
		'titre' => 'required|min:3|max:100',
		'genre_id' => 'require_only:genre_new|integer|reference:collections_genre,id|validator:getGenre',
                'serie_id' => 'without:serie_new|integer|reference:collections_serie,id|validator:getSerie',
		'couverture' => 'max:255',
		'console' => 'required|array|validator:getConsole,nom',
		'editeur' => 'required|min:3|max:100',
	];	


	public function setMetadataAttribute($value,$array) {
		$meta = json_decode($value);
		$meta->console = $array['console'];
		$meta->editeur = $array['editeur'];
		return json_encode($meta);
	}

	public function getConsoleAttribute($value,$array) {

		$meta = json_decode($array['metadata']);

		if(isset($meta->console)) {
			return $meta->console;
		}

		return '';
	}

	protected function getEditeurAttribute($value, $array) {
		$meta = json_decode($array['metadata']);

		if(isset($meta->editeur)) {
			return $meta->editeur;
		}

		return '';			
	}	


	public function getByConsole($console, $pagination) {

            $result = [];

            $where = "metadata LIKE ?";
            $pattern = '%console":'.$console.'%';
            $result['data'] = $this->requestMultiple($this->getQuery(['where' => $where, 'pagination' => $pagination]), [$pattern]);

            $this->addPagination($pagination, $result, $where, [$pattern]);


            return $result;
     

	}	

	public function getConsole() {
		return [
                    ['nom' => 'nes', 'valeur' => 'NES'],
                    ['nom' => 'snes', 'valeur' => 'SNES'],
                    ['nom' => 'n64', 'valeur' => 'Nintendo 64'],
                    ['nom' => 'gc', 'valeur' => 'GameCube'],
                    ['nom' => 'wii', 'valeur' => 'Wii'],
                    ['nom' => 'wiiu', 'valeur' => 'Wii U'],
                    ['nom' => 'switch', 'valeur' => 'Nintendo Switch'],
                    ['nom' => 'gb', 'valeur' => 'Gameboy'],
                    ['nom' => 'gbc', 'valeur' => 'Gameboy Color'],
                    ['nom' => 'gba', 'valeur' => 'Gameboy Advance'],
                    ['nom' => 'ds', 'valeur' => 'Nintendo DS'],
                    ['nom' => '3ds', 'valeur' => 'Nintendo 3DS'],

                    ['nom' => 'ps1', 'valeur' => 'PlayStation'],
                    ['nom' => 'ps2', 'valeur' => 'PlayStation 2'],
                    ['nom' => 'ps3', 'valeur' => 'PlayStation 3'],
                    ['nom' => 'ps4', 'valeur' => 'PlayStation 4'],
                    ['nom' => 'psp', 'valeur' => 'PlayStation Portable'],
                    ['nom' => 'vita', 'valeur' => 'PlayStation Vita'],
                    ['nom' => 'xbox', 'valeur' => 'Xbox'],
                    ['nom' => 'x360', 'valeur' => 'Xbox 360'],
                    ['nom' => 'xone', 'valeur' => 'Xbox One'],
                    ['nom' => 'pc', 'valeur' => 'PC']
		];

	}

}