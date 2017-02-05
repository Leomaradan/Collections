<?php

namespace App\Controllers\Commons;

use \App\Models\Commons\JeuxVideoDAO;

/**
* 
*/
class JeuxVideoController extends CommonsController
{
	function __construct($container)
	{
		parent::__construct($container);
		JeuxVideoDAO::register($container, 'jv');
		$this->dao = 'jv';
	}
        
	public function filterByConsole(Request $request, Response $response, $args) {
		$dao = $this->getCurrentDAO();

		$pagination = $this->getPagination($request);
		
		$data = $this->container->$dao->getByConsole($args['console'], $pagination);

		return $response->withJson($data);
	}   
        
	public function filterByAuteur(Request $request, Response $response, $args) {
		return $response->withJson(['error' => 'bad method exception'], 400);
	}        
	
}
