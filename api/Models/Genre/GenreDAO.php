<?php

namespace App\Models\Genre;

Use App\Models\CollectionsDAO;

class GenreDAO extends CollectionsDAO {

    protected $view = "collections_view_genre";
    protected $table = "collections_genre";
    protected $searchItems = ['nom', 'type_id'];
    protected $fillable = ['nom', 'type_id'];
    protected $visible = ['nom','type_description','type_id', 'utilisation'];

    protected $validation = [
        'nom' => 'required|min:3|max:50',
        'type_id' => 'integer|reference:collections_type,id'
    ];
    
    protected $titleField = "nom";

    public function create($data, $extraData = null) {

        // Pre-Action
        $sql = "SELECT SQL_CACHE * FROM {$this->table} WHERE type_id = :type AND nom_key LIKE make_key(:nom) ORDER BY nom";
        $result = $this->requestSingle($sql, [':type' => $data['type_id'], ':nom' => $data['nom']]);
        if ($result !== false && count($result) > 0) {
            return ['id' => $result['id']];
        }

        // Action
        $result = parent::create($data, $extraData);


        // Post-Action



        return $result;
    }

    public function getByType($types = null) {
        if ($types) {
            $types = implode("','", $types);
            $sql = "SELECT SQL_CACHE `g`.* FROM {$this->table} AS g LEFT JOIN `collections_type` AS t ON (g.type_id = t.id) WHERE t.nom IN ('$types') OR g.type_id IS NULL ORDER BY nom;";
        } else {
            $sql = "SELECT SQL_CACHE `g`.* FROM {$this->table} AS g LEFT JOIN `collections_type` AS t ON (g.type_id = t.id) ORDER BY nom;";
        }

        return $this->requestMultiple($sql);
    }

}
