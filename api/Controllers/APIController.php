<?php

namespace App\Controllers;

use Slim\Http\Request;
use Slim\Http\Response;
use \App\Models\CollectionsDAO;
use \App\Models\Genre\GenreDAO;
use \App\Models\Serie\SerieDAO;
use \App\Models\Auteur\AuteurDAO;

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

		$pagination = $this->getPagination($request);

		$data = $this->container->$dao->getAll($pagination);

		return $response->withJson($data);
	}

	protected function getPagination(Request $request) {

		$pagination = [];

		$params = $request->getParams();
		if(isset($params['pagination'])) {
			$pagination['perPage'] = $params['pagination'];
			$pagination['page'] = (isset($params['page'])) ? max($params['page'] - 1, 0) : 0;
			$pagination['offset'] = $pagination['perPage'] * $pagination['page'];
			
		}
		$pagination['request'] = $request->getUri()->getPath();

		return $pagination;
	}

	public function show(Request $request, Response $response, $args) {
		$dao = $this->getCurrentDAO();
		
		$data = $this->container->$dao->getById($args['id']);
		$data['request'] = $request->getUri()->getPath();

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

		$data = $this->container->$dao->getById($data['id']);

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

		$data = $this->container->$dao->getById($args['id']);	

		return $response->withJson($data);
	}	

	public function delete(Request $request, Response $response, $args) {
		$dao = $this->getCurrentDAO();

		$this->container->$dao->delete($args['id']);

		return $response->withJson([],204);
	}	

	public function validate(Request $request, Response $response) {
		$dao = $this->getCurrentDAO();

		$params = $request->getParams();
		
		$data = $this->container->$dao->validate($params);

		$genre = $serie = $auteurs = true;

		if(isset($params['genre_new'])) { 
			GenreDAO::register($this->container, 'genre');
			$genre = $this->container->genre->validate($params['genre_new']);
		}

		if(isset($params['serie_new'])) { 
			SerieDAO::register($this->container, 'serie');
			$serie = $this->container->serie->validate($params['serie_new']);
		}

		if(isset($params['auteurs_new'])) {
			AuteurDAO::register($this->container, 'auteur'); 
			$auteurs_list = $params['auteurs_new'];
			$auteurs_validation = [];
			foreach ($auteurs_list as $auteur) {
				$validation = $this->container->auteur->validate($auteur);
				if($validation !== true) {
					$auteurs_validation[] = $validation;
				}
			}

			$auteurs = (count($auteurs_validation) > 0) ? $auteurs_validation : true;
			
		}




		if($data === true && $genre === true && $serie === true && $auteurs === true) {
			$data = ['ok'=>'ok'];
		} else {
			if($data === true) {
				$data = [];
			}

			if($genre !== true) $data['genre_new'] = $genre;
			if($serie !== true) $data['serie_new'] = $serie;
			if($auteurs !== true) $data['auteurs_new'] = $auteurs;

			return $response->withJson($data, 400);
		}

		return $response->withJson($data);
	}		
}