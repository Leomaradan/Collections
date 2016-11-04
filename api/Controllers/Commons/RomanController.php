<?php

namespace App\Controllers\Commons;

use \App\Models\Commons\RomanDAO;
use Slim\Http\Request;
use Slim\Http\Response;

/**
* 
*/
class RomanController extends CommonsController
{
	function __construct($container)
	{
		parent::__construct($container);
		RomanDAO::register($container, 'roman');
		$this->dao = 'roman';
	}
	
}