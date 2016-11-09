<?php

namespace App\Controllers\Commons;

use \App\Models\Commons\FilmDAO;
use Slim\Http\Request;
use Slim\Http\Response;

/**
* 
*/
class FilmController extends CommonsController
{
	function __construct($container)
	{
		parent::__construct($container);
		FilmDAO::register($container, 'film');
		$this->dao = 'film';
	}

	public function filterByFormat(Request $request, Response $response, $args) {
		$dao = $this->getCurrentDAO();
		
		$data = $this->container->$dao->getByFormat($args['format']);

		return $response->withJson($data);
	}		
	
}