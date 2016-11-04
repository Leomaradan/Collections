<?php

namespace App\Controllers\Serie;

use Slim\Http\Request;
use Slim\Http\Response;
use \App\Models\Serie\SerieDAO;
use \App\Controllers\APIController;

/**
* 
*/
class SerieController extends APIController {
	function __construct($container)
	{
		parent::__construct($container);
		SerieDAO::register($container, 'serie');
		$this->dao = 'serie';
	}
}