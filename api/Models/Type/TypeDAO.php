<?php

namespace App\Models\Type;

Use App\Models\CollectionsDAO;

class TypeDAO extends CollectionsDAO {

    protected $table = "collections_type";
    protected $searchItems = ['nom', 'description'];
    protected $fillable = ['nom', 'description'];
    protected $validation = [
        'nom' => 'required|min:3|max:50',
        'description' => 'required|min:3|max:100'
    ];
    
    protected $titleField = "nom";

    public function create($data, $extraData = null) {

        // Pre-Action
        $sql = "SELECT SQL_CACHE * FROM {$this->table} WHERE nom LIKE :nom ORDER BY nom";
        $result = $this->requestSingle($sql, [':description' => $data['description'], ':nom' => $data['nom']]);
        if ($result !== false && count($result) > 0) {
            return ['id' => $result['id']];
        }

        // Action
        $result = parent::create($data, $extraData);


        // Post-Action



        return $result;
    }

}
