<?php

namespace App\Controllers\Commons;

use \App\Models\Commons\BdDAO;
use Slim\Http\Request;
use Slim\Http\Response;

/**
* 
*/
class BdController extends CommonsController
{
	function __construct($container)
	{
		parent::__construct($container);
		BdDAO::register($container, 'bd');
		$this->dao = 'bd';
	}
	
}