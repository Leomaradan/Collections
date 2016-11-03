<?php

namespace App\Controllers;

use \App\Models\MangaDAO;
use Psr\Http\Message\RequestInterface;
use Psr\Http\Message\ResponseInterface;

/**
* 
*/
class MangaController extends APIController
{
	function __construct($container)
	{
		parent::__construct($container);
		MangaDAO::register($container, 'manga');
		$this->dao = 'manga';
	}

	public function filterBySerie(RequestInterface $request, ResponseInterface $response, $args) {
		return $response->getBody()->write(json_encode(['error' => 'bad method exception']));
	}
	
}