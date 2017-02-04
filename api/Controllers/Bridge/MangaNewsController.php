<?php

namespace App\Controllers\Bridge;

use Slim\Http\Request;
use Slim\Http\Response;
use Apix\Cache;

/**
* 
*/
class MangaNewsController extends BridgeController {

	private $genreEquivalence = ["Shonen" => "Shōnen"];


	public function search(Request $request, Response $response) {
		$query = $request->getQueryParams();

		$q = $query['q'];
		$timestamp = time();

		$url = "http://www.manga-news.com/services.php?f=autoCompleteElasticSearch&q=$q&limit=10&timestamp=$timestamp";


		//$data = file_get_contents($url);
                
                $data = $this->getUrl($url, 'http://www.manga-news.com');
                
		$lines = explode(PHP_EOL, $data);
		$return = [];

		foreach ($lines as $line) {

			if($line !== '') {

				$line_explode = explode('|', $line);

				$item = [];

				$item['title'] = $line_explode[0];
				$item['resource'] = $line_explode[2];
				$item['category'] = $line_explode[4];
				$item['thumbnail'] = $line_explode[3];

				$item['url'] = $item['category'] . '/' . $item['resource'];


				$thumbnailUrl = 'http://www.manga-news.com/public/images/' . $item['category'] . '/';

				if($item['category'] == 'serie') {
					$thumbnailUrl = 'http://www.manga-news.com/public/images/series/';
				}

				$item['thumbnail'] = $thumbnailUrl . $item['thumbnail'];

				$return[] = $item;
			}


		}		

		
		return $response->withJson($return);

	}

	public function gather(Request $request, Response $response) { 

		$query = $request->getQueryParams();

		$resource = $query['resourceUrl'];

      	$options = array(
      		'directory'  => sys_get_temp_dir() . '/apix-cache'
  		);

   
      
 		$files_cache = new Cache\Files($options);

		if ( !$return = $files_cache->load('manganews-cache.'.$resource) ) {
			
			$return = [];

			$url = "http://www.manga-news.com/index.php/$resource";

			//$html = file_get_html($url);	
                        $html = $this->getHtmlDom($url, 'http://www.manga-news.com');

			$return['titre'] = $html->find('h1.entryTitle')[0]->plaintext;
			$return['couverture'] = $html->find('a[rel="imagebox-covert"]')[0]->href;
			$genre = trim($html->find('a[href^="http://www.manga-news.com/index.php/type/"]')[0]->plaintext);

			if(isset($this->genreEquivalence[$genre])) {
				$genre = $this->genreEquivalence[$genre];
			}

			$return['genre'] = $genre;

			$auteursList = $html->find('a[href^="http://www.manga-news.com/index.php/auteur/"]');
			$return['auteurs'] = [];

			foreach($auteursList as $auteurItem) {
				$item = trim($auteurItem->plaintext);
				if($item !== '') { 

					preg_match("/[A-Z ]+/", $item, $output_array);

					$majuscule = $output_array[0];
					$index = strrpos($majuscule, ' ');

					$nom = substr ( $item , 0 , $index );
					$prenom = substr ( $item , $index - strlen($item) + 1 );

					$item = "$prenom $nom";

					$return['auteurs'][] = ucwords(strtolower($item)); 
				}
			}
			$return['auteurs'] = array_unique($return['auteurs']);

			$volume_raw = $html->find('#numberblock')[0]->plaintext;

			preg_match("/VF : +(\d+) /im", $volume_raw, $output_array);

			$return['volume_max'] = $output_array[1];

			$return['stoppee'] = ($html->find('a[title="série stoppée"]')[0]->plaintext !== null);

			$files_cache->save($return, 'manganews-cache.'.$resource);
		} 

		return $response->withJson($return);


	}
}