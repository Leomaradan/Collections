<?php

namespace App\Controllers\Type;

use Slim\Http\Request;
use Slim\Http\Response;
use \App\Models\Type\TypeDAO;
use \App\Controllers\APIController;

/**
* 
*/
class TypeController extends APIController {
	function __construct($container)
	{
		parent::__construct($container);
		TypeDAO::register($container, 'type');
		$this->dao = 'type';
	}
}