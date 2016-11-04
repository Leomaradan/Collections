<?php

namespace App\Controllers\Commons;

use Slim\Http\Request;
use Slim\Http\Response;
use \App\Models\Commons\CollectionsDAO;
use \App\Controllers\APIController;

/**
* 
*/
class CommonsController extends APIController
{
	public function filterByGenre(Request $request, Response $response, $args) {
		$dao = $this->getCurrentDAO();
		
		$data = $this->container->$dao->getByGenre($args['genre']);

		return $response->withJson($data);
	}	

	public function filterByAuteur(Request $request, Response $response, $args) {
		$dao = $this->getCurrentDAO();
		
		$data = $this->container->$dao->getByAuteur($args['auteur']);

		return $response->withJson($data);
	}	

	public function filterBySerie(Request $request, Response $response, $args) {
		$dao = $this->getCurrentDAO();

		if(isset($args['serie'])) {
			$data = $this->container->$dao->getBySerie($args['serie']);
		} else {
			$data = $this->container->$dao->getByNullSerie(); 
		}

		return $response->withJson($data);
	}		

	public function availlableSerie(Request $request, Response $response) {
		$dao = $this->getCurrentDAO();
		
		$data = $this->container->$dao->getSerie();

		return $response->withJson($data);
	}

	public function availlableGenre(Request $request, Response $response) {
		$dao = $this->getCurrentDAO();

		$data = $this->container->$dao->getGenre();

		return $response->withJson($data);
	}	

	public function search(Request $request, Response $response) {
		$query = $request->getQueryParams();
		if(count($query) == 0) {
			return $response->getBody()->write(json_encode(['error' => 'missing term in search']));
		}

		$dao = $this->getCurrentDAO();

		$data = $this->container->$dao->search($query);

		return $response->withJson($data);
	}
}