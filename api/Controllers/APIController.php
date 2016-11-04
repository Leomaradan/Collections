<?php

namespace App\Controllers;

use Slim\Http\Request;
use Slim\Http\Response;
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

	protected function getCurrentDAO() {

		if($this->dao == null) {
			CollectionsDAO::register($this->container, 'all');
			$this->dao = 'all';
		}

		return $this->dao;

	}

	public function index(Request $request, Response $response) {
		$dao = $this->getCurrentDAO();
		
		$data = $this->container->$dao->getAll();

		return $response->withJson($data);
	}

	public function show(Request $request, Response $response, $args) {
		$dao = $this->getCurrentDAO();
		
		$data = $this->container->$dao->getById($args['id']);

		return $response->withJson($data);
	}	

	public function create(Request $request, Response $response) {
		$dao = $this->getCurrentDAO();

		$validation = $this->container->$dao->validate($request->getParams());

		if($validation === true) {
			$data = $this->container->$dao->create($request->getParams());
		} else {
			return $response->withJson($validation,400);
		}

		return $response->withJson($data);
	}	

	public function update(Request $request, Response $response, $args) {
		$dao = $this->getCurrentDAO();

		$validation = $this->container->$dao->validate($request->getParams(), true);

		if($validation === true) {
			$data = $this->container->$dao->update($args['id'], $request->getParams());
		} else {
			return $response->withJson($validation,400);
		}		

		return $response->withJson($data);
	}	

	public function delete(Request $request, Response $response, $args) {
		$dao = $this->getCurrentDAO();

		$this->container->$dao->delete($args['id']);

		return $response->withJson([],204);
	}	

	public function validate(Request $request, Response $response) {
		$dao = $this->getCurrentDAO();
		
		$data = $this->container->$dao->validate($request->getParams());

		if($data === true) {
			$data = ['ok'=>'ok'];
		} else {
			return $response->withJson($data, 400);
		}

		return $response->withJson($data);
	}		
}