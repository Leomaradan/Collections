<?php

namespace App\Models;

use \PDO as PDO;
use \Exception as Exception;

/**
 * Configuration DAO
 *
 * Connecteur général, destiné à être hérités
 * Il ne s'agit pas d'un véritable DAO, mais le but est le même 
 *
 * @author leo maradan
 * @version 1.0
 * @package conf
 */
 
	
	class ConnecteurDAO {

		/**
		 * Propriétés:  
		 * $_conn enregistre la référence de connection
		 * $_statement enregistre le dernier jeu de résultat reçu
		 */ 
		 
		/**
		 * Enregistre la référence de connection
		 * @var PDO Reference de connection
		 */
		protected $_conn = null;
		
		/**
		 * Enregistre le dernier jeu de résultat reçu
		 * @var PDOStatement Jeu de résultat
		 */		
		protected $_statement = null;

		/**
		 * Méthode de récupération d'instance
		 * Récupère une instance si elle existe, sinon la créer
		 * Chaque classes enfant ont des connections enregistrés séparément
		 * Chaque base de données également
		 * @param String $base Nom de la BDD
		 * @return Object instance demandée au Singleton
		 */
		/*public static function getInstance($base = "default")
		{
			static $instances = array();

			$class = get_called_class();
			
			$key = md5(SERVER_ROOT.'/'.$class);

			if (isset($instances[$key][$base]) === false)
			{
				$instances[$key][$base] = new $class($base);
			}

			return $instances[$key][$base];   
		} */
	   
	    /**
		 * Constructeur
		 * Mis en visibilité protegé, pour éviter d'instancier manuellement
		 * la classe, obligeant à passer par le pattern Singleton
		 * Etant protegé, elle peut être redéfinie par des classes enfant
		 */
		public function __construct(ConnecteurDAO $connection = null) {
		
			// Construction de la connection
		
			if(is_null($connection)) {
				$conf = $this->info_connect();
				
				$dsn = 'mysql:dbname='.$conf['bdd'].';host='.$conf['serveur'];
				
				try {
					if($conf['pass'] && $conf['pass'] != "") {
						$connect = new PDO($dsn, $conf['user'], $conf['pass']);
					} else {
						$connect = new PDO($dsn, $conf['user']);
					}
					$connect->exec('SET NAMES utf8');
					$connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				} catch (Exception $e) {
					trigger_error("La base de données n'est pas accessible", E_USER_ERROR);
					// Inscription de l'erreur dans un fichier log ? $e->getMessage();				
				}
				
				$this->_conn = $connect;
			} else {
				$this->_conn = $connection->_conn;
			}

			
		}

		public static function register($container, $name = null, $connection = null) {
			$class = get_called_class();
			
			$name = ($name !== null) ? $name : $c = (new \ReflectionClass(get_called_class()))->getShortName();

			$container[$name] = function() use ($class, $connection) {
				return new $class($connection);
			};
		}

		/**
		 * La méthode __clone() est interdite, il faut passer par le Singleton
		 */
		//private function __clone() {}

		/** 
		 * Retourne la connection. Ne devrait pas être utilisé, mais est 
		 * publique pour faciliter le développement
		 * @return PDO connection PDO	 
		 */
		public function getConn() {
			return $this->_conn;
		}

		private function info_connect(){
			$conf = [];
			/*switch ($i) {			
				case 'default':
				default:*/
					$conf['serveur'] = "localhost";
					$conf['user'] = "root";
					$conf['pass'] = "";
					$conf['bdd'] = "slim";
					/*break;
			}*/

			return $conf;
		}

		/**
		 * Exécute une requête via PDO::query, met en mémoire le jeu de valeur et le retourne
		 * @param String $query Requête SQL
		 * @return PDOStatement jeu de données	 
		 */
		public function query($query) {
			try {
				$this->_statement = $this->_conn->query($query);
				return $this->_statement;
			} catch (Exception $e) {
				trigger_error("Une erreur à été générée dans la base de données", E_USER_ERROR);
				// Inscription de l'erreur dans un fichier log ? $e->getMessage();
			}
		}

		/**
		 * Exécute une requête via PDO::query, met en mémoire le jeu de valeur et le retourne
		 * @param String $query Requête SQL
		 * @return PDOStatement jeu de données	 
		 */
		public function queryFetch($query) {
			try {
				$this->_statement = $this->_conn->query($query);
				return $this->_statement->fetchAll(PDO::FETCH_ASSOC);
			} catch (Exception $e) {
				trigger_error("Une erreur à été générée dans la base de données", E_USER_ERROR);
				// Inscription de l'erreur dans un fichier log ? $e->getMessage();
			}
		}		
		
		/**
		 * Prépare une requête via PDO::prepare. La requête devra être exécuté via PDOStatement::execute
		 * @param String $query Requête préparée SQL
		 * @return PDOStatement Linker vers la requête préparée
		 */
		public function prepare($query) { 
			try {
				$this->_statement = $this->_conn->prepare($query);
				return $this->_statement;
			} catch (Exception $e) {
				trigger_error("Une erreur à été générée dans la base de données", E_USER_ERROR);
				// Inscription de l'erreur dans un fichier log ? $e->getMessage();
			}
		}
		
		/**
		 * Exécute une requête via PDO::exec (select n'est pas autorisé), et retourne le nombre de lignes affectés
		 * @param String $query Requête SQL
		 * @return Integer Nombre de lignes traitées 		 
		 */		
		public function exec($query) {
			try {
				return $this->_conn->exec($query);
			} catch (Exception $e) {
				trigger_error("Une erreur à été générée dans la base de données", E_USER_ERROR);
				// Inscription de l'erreur dans un fichier log ? $e->getMessage();
			}				
		}		
		
		public function lastId() {
                    try {
                        return $this->_conn->lastInsertId();
                    } catch (Exception $e)
                    {
                        trigger_error("Une erreur à été générée dans la base de données", E_USER_ERROR);
                    }
                }

		/**
		 * @TODO documenter la fonction
		 */		
		public function executePreparedStatement($pdoStatement = null, $param = null) {

			if(!is_object($pdoStatement) || get_class($pdoStatement) !== 'PDOStatement') {
				$param = $pdoStatement;
				$pdoStatement = null;
			}

			if($pdoStatement) {
				return $pdoStatement->execute($param);
			}
			
			return $this->_statement->execute($param);				
		}
		
		/**
		 * Cette fonction retourne une ligne d'un jeu d'enregistrement
		 * Si celui-ci n'est pas définie, il utilisera le jeu stocké. Pas de 
		 * vérification si celui-ci est définie ou non
		 * @param PDOStatement $pdoStatement Jeu de données
		 * @param Integer $type Type de tableau
		 * @return Array Tableau contenant les données d'une ligne 		 
		 */
		public function fetch($pdoStatement = null, $type = PDO::FETCH_BOTH) {

			if(!is_object($pdoStatement) || get_class($pdoStatement) !== 'PDOStatement') {
				$type = $pdoStatement;
				$pdoStatement = null;
			}

			if($pdoStatement) {
				return $pdoStatement->fetch($type);
			}
			
			return $this->_statement->fetch($type);
		}
		
		/**
		 * Cette fonction retourne toutes les lignes d'un jeu d'enregistrement
		 * Si celui-ci n'est pas définie, il utilisera le jeu stocké. Pas de 
		 * vérification si celui-ci est définie ou non
		 * @param PDOStatement $pdoStatement Jeu de données
		 * @param Integer $type Type de tableau
		 * @return Array Tableau contenant toutes les données 		 
		 */		
		public function fetchAll($pdoStatement = null, $type = PDO::FETCH_BOTH) {

			if(!is_object($pdoStatement) || get_class($pdoStatement) !== 'PDOStatement') {
				$type = $pdoStatement;
				$pdoStatement = null;
			}

			if($pdoStatement) {
				return $pdoStatement->fetchAll($type);
			}
			
			return $this->_statement->fetchAll($type);
		}		
		
		/**
		 * Alias de la fonction fetch, pour avoir une meilleurs visibilité dans le code les utilisants
		 */
		public function fetch_assoc($pdoStatement = null) {
			return $this->fetch($pdoStatement, PDO::FETCH_ASSOC);
		}
		public function fetch_row($pdoStatement = null) {
			return $this->fetch($pdoStatement, PDO::FETCH_NUM);
		}
		public function fetch_array($pdoStatement = null) {
			return $this->fetch($pdoStatement, PDO::FETCH_BOTH);
		}
		
		/**
		 * Alias de la fonction fetchAll, pour avoir une meilleurs visibilité dans le code les utilisants
		 */		
		public function fetchAll_assoc($pdoStatement = null) {
			return $this->fetchAll($pdoStatement, PDO::FETCH_ASSOC);
		}
		public function fetchAll_row($pdoStatement = null) {
			return $this->fetchAll($pdoStatement, PDO::FETCH_NUM);
		}
		public function fetchAll_array($pdoStatement = null) {
			return $this->fetchAll($pdoStatement, PDO::FETCH_BOTH);
		}		
		
		
		/*public function SelectPersoIdByName($name) {
			$sql = "SELECT SQL_CACHE persos.id FROM persos WHERE nom LIKE ? LIMIT 1";
			$this->prepare($sql);
			$this->executePreparedStatement(null,array('%'.$name.'%'));

			$response = $this->fetch();			
			
			return $response[0];
		}*/	
	}


?>