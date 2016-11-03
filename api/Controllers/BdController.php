<?php

namespace App\Controllers;

use \App\Models\BdDAO;
use Psr\Http\Message\RequestInterface;
use Psr\Http\Message\ResponseInterface;

/**
* 
*/
class BdController extends APIController
{
	function __construct($container)
	{
		parent::__construct($container);
		BdDAO::register($container, 'bd');
		$this->dao = 'bd';
	}
	
}