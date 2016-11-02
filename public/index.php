<?php

require '../vendor/autoload.php';

$app = new \Slim\App([
	'settings' => [
        'displayErrorDetails' => true,
	]
]);

$container = $app->getContainer();
$container['notAllowedHandler'] = function ($c) {
    return function ($request, $response, $methods) use ($c) {
        return $c['response']
            ->withStatus(405)
            ->withHeader('Allow', implode(', ', $methods))
            ->withHeader('Content-type', 'text/html')
            ->write('Method must be one of: ' . implode(', ', $methods));
    };
};


$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
});


$app->get('/', function($request, $response) {
	$result = $this->ConnecteurDAO->queryFetch('SELECT * FROM collections_commons');

	$response->write('<pre>');
	$response->write(var_export($result));
	return $response->write('Salut les gens');
});


$types = ['all' => 'APIController', 'bd' => 'BdController', 'film' => 'FilmController', 'manga' => 'MangaController', 'roman' => 'RomanController'];

foreach ($types as $key => $value) {
	$app->get("/$key", 'App\Controllers\\'.$value.':index');
	$app->get("/$key/{id:[0-9]+}", 'App\Controllers\\'.$value.':show');
	$app->get("/$key/genre/{genre:[0-9]+}", 'App\Controllers\\'.$value.':filterByGenre');
	$app->get("/$key/auteur/{auteur}", 'App\Controllers\\'.$value.':filterByAuteur');
	$app->get("/$key/serie[/{serie:[0-9]+}]", 'App\Controllers\\'.$value.':filterBySerie');

	$app->get("/$key/info/genre", 'App\Controllers\\'.$value.':availlableGenre');
	$app->get("/$key/info/serie", 'App\Controllers\\'.$value.':availlableSerie');

	$app->get("/$key/recherche", 'App\Controllers\\'.$value.':search');

	$app->post("/$key", 'App\Controllers\\'.$value.':create');
	$app->put("/$key/{id:[0-9]+}", 'App\Controllers\\'.$value.':update');
	$app->delete("/$key/{id:[0-9]+}", 'App\Controllers\\'.$value.':delete');	
}

$app->get('/film/format/{format}', 'App\Controllers\FilmController:filterByFormat');


/*$app->get('/{type}', function($request, $response, $args) {});
$app->get('/{type}/{id}', function($request, $response, $args) {});
$app->get('/{type}/genre/{genre}', function($request, $response, $args) {});
$app->get('/{type}/auteur/{auteur}', function($request, $response, $args) {});
$app->get('/{type}/serie/{serie}', function($request, $response, $args) {});



$app->get('/{type}/recherche', function($request, $response, $args) {});

$app->post('/{type}', function($request, $response, $args) {});
$app->put('/{type}/{id}', function($request, $response, $args) {});
$app->delete('/{type}/{id}', function($request, $response, $args) {});*/

/*
get	/{type}
get	/{type}/{id}
get	/{type}/genre/{genre}
get	/{type}/auteur/{auteur}
get	/{type}/recherche?{querystring}
post	/{type}
put	/{type}/{id}
delete	/{type}/{id}
	
get	/{type}/serie/{id}
get	/dvd/format/{format}

*/





$app->run();