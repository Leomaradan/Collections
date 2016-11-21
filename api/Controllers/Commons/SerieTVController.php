<?php

namespace App\Controllers\Commons;

use \App\Models\Commons\SerieTVDAO;
use Slim\Http\Request;
use Slim\Http\Response;

/**
* 
*/
class SerieTVController extends CommonsController
{
	function __construct($container)
	{
		parent::__construct($container);
		SerieTVDAO::register($container, 'serietv');
		$this->dao = 'serietv';
	}

	public function filterBySerie(Request $request, Response $response, $args) {
		return $response->withJson(['error' => 'bad method exception'], 400);
	}
	
}