<?php

namespace App\Controllers;

use \App\Models\RomanDAO;
use Psr\Http\Message\RequestInterface;
use Psr\Http\Message\ResponseInterface;

/**
* 
*/
class RomanController extends APIController
{
	function __construct($container)
	{
		parent::__construct($container);
		RomanDAO::register($container, 'roman');
		$this->dao = 'roman';
	}
	
}