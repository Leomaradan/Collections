<?php

namespace App\Controllers\Auteur;

use Slim\Http\Request;
use Slim\Http\Response;
use \App\Models\Auteur\AuteurDAO;
use \App\Controllers\APIController;

/**
* 
*/
class AuteurController extends APIController {
	function __construct($container)
	{
		parent::__construct($container);
		AuteurDAO::register($container, 'auteur');
		$this->dao = 'auteur';
	}
}