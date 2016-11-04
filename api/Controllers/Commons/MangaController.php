<?php

namespace App\Controllers\Commons;

use \App\Models\Commons\MangaDAO;
use Slim\Http\Request;
use Slim\Http\Response;

/**
* 
*/
class MangaController extends CommonsController
{
	function __construct($container)
	{
		parent::__construct($container);
		MangaDAO::register($container, 'manga');
		$this->dao = 'manga';
	}

	public function filterBySerie(Request $request, Response $response, $args) {
		return $response->withJson(['error' => 'bad method exception'], 400);
	}
	
}