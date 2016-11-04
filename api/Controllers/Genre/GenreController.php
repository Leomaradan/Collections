<?php

namespace App\Controllers\Genre;

use Slim\Http\Request;
use Slim\Http\Response;
use \App\Models\Genre\GenreDAO;
use \App\Controllers\APIController;

/**
* 
*/
class GenreController extends APIController {
	function __construct($container)
	{
		parent::__construct($container);
		GenreDAO::register($container, 'genre');
		$this->dao = 'genre';
	}
}