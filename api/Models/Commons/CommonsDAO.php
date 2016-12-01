<?php

namespace App\Models\Commons;

use \PDO as PDO;
Use App\Models\CollectionsDAO;
Use App\Models\Genre\GenreDAO;
Use App\Models\Serie\SerieDAO;
Use App\Models\Auteur\AuteurDAO;

class CommonsDAO extends CollectionsDAO {

    protected $view = "collections_view_total";
    protected $table = "collections_commons";
    protected $searchItems = ['titre', 'serie', 'genre', 'auteurs'];
    protected $visible = ['titre', 'serie', 'genre', 'auteurs', 'volume', 'couverture'];
    protected $type_id = 0;

    public function __construct(ConnecteurDAO $connection = null) {
        parent::__construct($connection);
        if ($this->type) {
            $this->prepare("SELECT id FROM collections_type WHERE nom LIKE '{$this->type}'");

            $this->executePreparedStatement();

            $this->type_id = $this->fetch(PDO::FETCH_NUM)[0];
        }
    }

    public function getByGenre($genre, $pagination) {    

        $result = [];

        $where = "genre_id = ?";
        $result['data'] = $this->requestMultiple($this->getQuery(['where' => $where, 'pagination' => $pagination]), [$genre]);

        $this->addPagination($pagination, $result, $where, [$genre]);


        return $result;

    }

    public function getByAuteur($auteur, $pagination) {

        $result = [];

        $where = "auteurs_id LIKE ?";
        $result['data'] = $this->requestMultiple($this->getQuery(['where' => $where, 'pagination' => $pagination]), ['%|' . $auteur . '|%']);

        $this->addPagination($pagination, $result, $where, ['%|' . $auteur . '|%']);


        return $result;

    }

    public function getBySerie($serie, $pagination) {

        $result = [];

        $where = "serie_id = ?";
        $result['data'] = $this->requestMultiple($this->getQuery(['where' => $where, 'pagination' => $pagination, 'order' => 'volume']), [$serie]);

        $pagination['order'] = 'volume';

        $this->addPagination($pagination, $result, $where, [$serie]);


        return $result;

    }

    public function getByNullSerie($pagination) {

        $result = [];

        $where = "serie_id IS NULL";
        $result['data'] = $this->requestMultiple($this->getQuery(['where' => $where, 'pagination' => $pagination]));

        $this->addPagination($pagination, $result, $where);


        return $result;

    }

    public function create($data, $extraData = null) {

        // Pre-Action
        if (is_array($extraData)) {
            $extraData = array_merge($extraData, ['type_id' => $this->type_id]);
        } else {
            $extraData = ['type_id' => $this->type_id];
        }

        if (isset($data['genre_new'])) {

            $result = $this->addGenre($data['genre_new'], $extraData);

            if ($result !== true) {
                return $result;
            }
        }

        if (isset($data['serie_new'])) {

            $result = $this->addSerie($data['serie_new'], $extraData);

            if ($result !== true) {
                return $result;
            }
        }

        if (isset($data['auteurs_new'])) {

            $data['auteurs_new'] = array_unique($data['auteurs_new']);

            $auteurs = $this->addAuteurs($data['auteurs_new'], $extraData);
            if (count($auteurs['message']) > 0) {
                return $auteurs['message'];
            }
        }

        $extraData['metadata'] = "{}";

        // Action
        $result = parent::create($data, $extraData);


        // Post-Action
        $preserveAuteurs = false;
        if (isset($data['auteurs_id'])) {

            if (isset($auteurs)) {
                $dao = $auteurs['auteursDAO'];
            } else {
                $dao = new AuteurDAO($this);
            }

            $dao->bind($result['id'], $data['auteurs_id']);
            $preserveAuteurs = true;
        }

        if (isset($data['auteurs_new'])) {

            if (count($auteurs['ids']) > 0) {
                // need to bind
                $auteurs['auteursDAO']->bind($result['id'], $auteurs['ids'], $preserveAuteurs);
            }
        }


        return $result;
    }

    public function update($id, $data, $extraData = null) {

        // Pre-Action
        if (is_array($extraData)) {
            $extraData = array_merge($extraData, ['type_id' => $this->type_id]);
        } else {
            $extraData = ['type_id' => $this->type_id];
        }

        if (isset($data['genre_new'])) {

            $result = $this->addGenre($data['genre_new'], $extraData);

            if ($result !== true) {
                return $result;
            }
        }

        if (isset($data['serie_new'])) {

            $result = $this->addSerie($data['serie_new'], $extraData);

            if ($result !== true) {
                return $result;
            }
        }

        if (isset($data['auteurs_new'])) {
            $auteurs = $this->addAuteurs($data['auteurs_new'], $extraData);
            if (count($auteurs['message']) > 0) {
                return $auteurs['message'];
            }
        }

        $this->prepare("SELECT metadata FROM {$this->table} WHERE id LIKE ?");

        $this->executePreparedStatement([$id]);

        $extraData['metadata'] = $this->fetch(PDO::FETCH_NUM)[0];

        // Action
        $result = parent::update($id, $data, $extraData);


        // Post-Action
        $preserveAuteurs = false;
        if (isset($data['auteurs_id'])) {

            if (isset($auteurs)) {
                $dao = $auteurs['auteursDAO'];
            } else {
                $dao = new AuteurDAO($this);
            }

            $dao->bind($id, $data['auteurs_id']);
            $preserveAuteurs = true;
        }

        if (isset($data['auteurs_new'])) {

            if (count($auteurs['ids']) > 0) {
                // need to bind
                $auteurs['auteursDAO']->bind($id, $auteurs['ids'], $preserveAuteurs);
            }
        }


        return $result;
    }

    protected function addGenre($genre_new, &$extraData) {

        $genre = new GenreDAO($this);

        if (!is_array($genre_new)) {
            $genre_new = ['nom' => $genre_new];
        }
        $genre_new['type_id'] = $this->type_id;
        $validation = $genre->validate($genre_new);
        if ($validation === true) {
            $result = $genre->create($genre_new);
            $extraData['genre_id'] = $result['id'];
        } else {
            return $validation;
        }

        return true;
    }

    protected function addSerie($serie_new, &$extraData) {

        $serie = new SerieDAO($this);
        $serie_new['type_id'] = $this->type_id;
        $validation = $serie->validate($serie_new);
        if ($validation === true) {
            $id = $serie->create($serie_new)['id'];
            $extraData['serie_id'] = $id;
        } else {
            return $validation;
        }

        return true;
    }

    protected function addAuteurs($auteurs_new, &$extraData) {

        $auteursDAO = new AuteurDAO($this);

        if (!is_array($auteurs_new)) {
            $auteurs_new = [$auteurs_new];
        }

        $ids = [];
        $message = [];

        foreach ($auteurs_new as $auteur_new) {
            if (!is_array($auteur_new)) {
                $auteur_new = ['nom' => $auteur_new];
            }

            $validation = $auteursDAO->validate($auteur_new);

            if ($validation === true) {
                $ids[] = $auteursDAO->create($auteur_new)['id'];
            } else {
                $message[] = $validation;
            }
        }

        return compact('ids', 'message', 'auteursDAO');
    }

    public function getSerie() {
        $serie = new SerieDAO($this);
        return ['data' => $serie->getByType($this->types)];
    }

    public function getGenre() {
        $genre = new GenreDAO($this);
        return ['data' => $genre->getByType($this->types)];
    }

    public function getGenreAttribute($value, $array) {
        return ['id' => $array['genre_id'], 'nom' => $array['genre']];
    }

    public function getSerieAttribute($value, $array) {
        if (isset($array['serie_id'])) {
            return ['id' => $array['serie_id'], 'nom' => $array['serie'], 'volume_max' => $array['volume_max']];
        }
        return null;
    }

    public function getAuteursAttribute($value, $array) {
        $auteurs_id = explode('|', $array['auteurs_id']);
        array_shift($auteurs_id);
        $auteurs_name = explode(', ', trim($array['auteurs']));
        $auteurs = [];

        $length = count($auteurs_name);


        for ($i = 0; $i < $length; $i++) {
            if (isset($auteurs_id[$i]) && isset($auteurs_id[$i])) {
                $auteurs[] = ['id' => $auteurs_id[$i], 'nom' => $auteurs_name[$i]];
            }
        }


        return $auteurs;
    }

}
