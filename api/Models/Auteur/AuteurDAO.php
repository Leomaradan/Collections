<?php

namespace App\Models\Auteur;

use App\Models\CollectionsDAO;

class AuteurDAO extends CollectionsDAO {

    protected $table = "collections_auteur";
    protected $pivot = "collections_auteur_commons";
    protected $searchItems = ['nom'];
    protected $fillable = ['nom'];
    protected $validation = [
        'nom' => 'required|min:3|max:50'
    ];

    public function create($data, $extraData = null) {
        // Pre-Action
        $sql = "SELECT SQL_CACHE * FROM {$this->table} WHERE nom LIKE ? LIMIT 1";
        $result = $this->requestSingle($sql, [$data['nom']]);

        if ($result !== false && count($result) > 0) {
            return ['id' => $result['id']];
        }


        // Action
        $result = parent::create($data, $extraData);


        // Post-Action



        return $result;
    }

    public function bind($commons_id, $auteurs_ids, $preserve = false) {

        if (!$preserve) {
            $this->exec("DELETE FROM {$this->pivot} WHERE commons_id = $commons_id;");
        }

        $this->prepare("INSERT INTO {$this->pivot} (auteur_id, commons_id) VALUES (?, $commons_id);");

        foreach ($auteurs_ids as $id) {
            $this->executePreparedStatement([$id]);
        }
        //die;	
    }

}
