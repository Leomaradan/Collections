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
        
        public function filterByShoppingList(Request $request, Response $response) {
		$dao = $this->getCurrentDAO();

		$pagination = $this->getPagination($request);

                $data = $this->container->$dao->getByShoppingList($pagination); 
                
		/*if(isset($args['serie'])) {
			$data = $this->container->$dao->getBySerie($args['serie'], $pagination);
		} else {
			$data = $this->container->$dao->getByNullSerie($pagination); 
		}*/

		return $response->withJson($data);
        }
	
}