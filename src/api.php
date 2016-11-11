<?php

require '../vendor/autoload.php';
$dotenv = new Dotenv\Dotenv(__DIR__ . '/..');
$dotenv->load();

$app = new \Slim\App([
	'settings' => [
        'displayErrorDetails' => (getenv('DEBUG')) ?: true,
	]
]);



$container = $app->getContainer();
$container['notAllowedHandler'] = function ($container) {
    return function ($request, $response, $methods) use ($container) {
        return $container['response']
            ->withStatus(405)
            ->withHeader('Allow', implode(', ', $methods))
            ->withHeader('Content-type', 'application/json')
            ->write(json_encode(["error" => "Method not allowed", "allowed_methods" => $methods]));
    };
};
$container['notFoundHandler'] = function ($container) {
    return function ($request, $response) use ($container) {
        return $container['response']
            ->withStatus(404)
            ->withHeader('Content-type', 'application/json')
            ->write(json_encode(["error" => "invalid request URI"]));
    };
}; 

$container['bdd_info'] = function ($container) {
    return [
            'serveur' => getenv('BDD_SERVER'),
            'user' => getenv('BDD_USER'),
            'pass' => getenv('BDD_PASSWORD'),
            'bdd' => getenv('BDD_NAME'),
    ];
};

$json_middleware = function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
};

$app->add($json_middleware);


$app->get('/', function($request, $response) {
	return $response->write('Salut les gens');
});


$types = [
    //'all' => 'Commons\CommonsController', 
    'bd' => 'Commons\BdController', 
    'film' => 'Commons\FilmController', 
    'manga' => 'Commons\MangaController', 
    'roman' => 'Commons\RomanController'
];

$types_cruds = array_merge($types, [
    'auteur' => 'Auteur\AuteurController',
    'genre' => 'Genre\GenreController',
    'serie' => 'Serie\SerieController'
]);

// CRUDS methods
foreach ($types_cruds as $key => $value) {
    $uri = "api/$key";
    $app->get("/$uri", 'App\Controllers\\'.$value.':index');
    $app->get("/$uri/{id:[0-9]+}", 'App\Controllers\\'.$value.':show');
    $app->get("/$uri/recherche", 'App\Controllers\\'.$value.':search');
    $app->post("/$uri", 'App\Controllers\\'.$value.':create');
    $app->post("/$uri/validate", 'App\Controllers\\'.$value.':validate');
    $app->put("/$uri/{id:[0-9]+}", 'App\Controllers\\'.$value.':update');
    $app->delete("/$uri/{id:[0-9]+}", 'App\Controllers\\'.$value.':delete'); 
}

// non-CRUDS methods
foreach ($types as $key => $value) {
    $uri = "api/$key";
    $app->get("/$uri/genre/{genre:[0-9]+}", 'App\Controllers\\'.$value.':filterByGenre');
    $app->get("/$uri/auteur/{auteur}", 'App\Controllers\\'.$value.':filterByAuteur');
    $app->get("/$uri/serie[/{serie:[0-9]+}]", 'App\Controllers\\'.$value.':filterBySerie');

    $app->get("/$uri/info/genre", 'App\Controllers\\'.$value.':availlableGenre');
    $app->get("/$uri/info/serie", 'App\Controllers\\'.$value.':availlableSerie');
}

$app->get('/api/film/format/{format}', 'App\Controllers\Commons\FilmController:filterByFormat');

/*$app->get('/api/auteur', 'App\Controllers\Auteur\AuteurController:index');
$app->get('/api/auteur/{id:[0-9]+}', 'App\Controllers\Auteur\AuteurController:show');
$app->get('/api/auteur/recherche', 'App\Controllers\Auteur\AuteurController:search');
$app->post('/api/auteur', 'App\Controllers\Auteur\AuteurController:create');
$app->post('/api/auteur/validate', 'App\Controllers\Auteur\AuteurController:validate');
$app->put('/api/auteur/{id:[0-9]+}', 'App\Controllers\Auteur\AuteurController:update');
$app->delete('/api/auteur/{id:[0-9]+}', 'App\Controllers\Auteur\AuteurController:delete');

$app->get('/api/genre', 'App\Controllers\Auteur\AuteurController:index');
$app->get('/api/genre/{id:[0-9]+}', 'App\Controllers\Auteur\AuteurController:show');
$app->get('/api/genre/recherche', 'App\Controllers\Auteur\AuteurController:search');
$app->post('/api/genre', 'App\Controllers\Auteur\AuteurController:create');
$app->post('/api/genre/validate', 'App\Controllers\Auteur\AuteurController:validate');
$app->put('/api/genre/{id:[0-9]+}', 'App\Controllers\Auteur\AuteurController:update');
$app->delete('/api/genre/{id:[0-9]+}', 'App\Controllers\Auteur\AuteurController:delete');*/




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