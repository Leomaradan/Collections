<?php

namespace App\Controllers;

use \App\Models\FilmDAO;
use Psr\Http\Message\RequestInterface;
use Psr\Http\Message\ResponseInterface;

/**
* 
*/
class FilmController extends APIController
{
	function __construct($container)
	{
		parent::__construct($container);
		FilmDAO::register($container, 'film');
		$this->dao = 'film';
	}
	
}