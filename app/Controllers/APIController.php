<?php

namespace App\Controllers;

use Psr\Http\Message\RequestInterface;
use Psr\Http\Message\ResponseInterface;
use \App\Models\CollectionsDAO;

/**
* 
*/
class APIController
{
	protected $container;
	protected $dao;
	
	function __construct($container)
	{
		$this->container = $container;
	}

	private function getCurrentDAO() {

		if($this->dao == null) {
			CollectionsDAO::register($this->container, 'all');
			$this->dao = 'all';
		}

		return $this->dao;

	}

	public function index(RequestInterface $request, ResponseInterface $response) {
		$dao = $this->getCurrentDAO();
		
		$data = $this->container->$dao->getAll();

		$response->getBody()->write(json_encode($data));
	}

	public function show(RequestInterface $request, ResponseInterface $response, $args) {
		$dao = $this->getCurrentDAO();
		
		$data = $this->container->$dao->getById($args['id']);

		$response->getBody()->write(json_encode($data));
	}	

	public function create(RequestInterface $request, ResponseInterface $response) {
		//$dao = $this->getCurrentDAO();
		return $response->getBody()->write(json_encode(['error' => 'not yet implemented']));
	}	

	public function update(RequestInterface $request, ResponseInterface $response, $args) {
		//$dao = $this->getCurrentDAO();
		return $response->getBody()->write(json_encode(['error' => 'not yet implemented']));
	}	

	public function delete(RequestInterface $request, ResponseInterface $response, $args) {
		//$dao = $this->getCurrentDAO();
		return $response->getBody()->write(json_encode(['error' => 'not yet implemented']));
	}			

	public function filterByGenre(RequestInterface $request, ResponseInterface $response, $args) {
		$dao = $this->getCurrentDAO();
		
		$data = $this->container->$dao->getByGenre($args['genre']);

		$response->getBody()->write(json_encode($data));
	}	

	public function filterByAuteur(RequestInterface $request, ResponseInterface $response, $args) {
		$dao = $this->getCurrentDAO();
		
		$data = $this->container->$dao->getByAuteur($args['auteur']);

		$response->getBody()->write(json_encode($data));
	}	

	public function filterBySerie(RequestInterface $request, ResponseInterface $response, $args) {
		$dao = $this->getCurrentDAO();

		if(isset($args['serie'])) {
			$data = $this->container->$dao->getBySerie($args['serie']);
		} else {
			$data = $this->container->$dao->getByNullSerie(); 
		}

		$response->getBody()->write(json_encode($data));
	}		

	public function availlableSerie(RequestInterface $request, ResponseInterface $response) {
		$dao = $this->getCurrentDAO();
		
		$data = $this->container->$dao->getSerie();

		$response->getBody()->write(json_encode($data));
	}

	public function availlableGenre(RequestInterface $request, ResponseInterface $response) {
		$dao = $this->getCurrentDAO();

		$data = $this->container->$dao->getGenre();

		$response->getBody()->write(json_encode($data));
	}	

	public function search(RequestInterface $request, ResponseInterface $response) {
		$query = $request->getQueryParams();
		if(count($query) == 0) {
			return $response->getBody()->write(json_encode(['error' => 'missing term in search']));
		}

		$dao = $this->getCurrentDAO();

		$data = $this->container->$dao->search($query);

		$response->getBody()->write(json_encode($data));
	}
}