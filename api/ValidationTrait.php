<?php

namespace App;

use \PDO as PDO;

trait ValidationTrait {
	public function validate($data, $ignoreRequered = false) {
		if(!$this->validation) {
			return "no validation rules";
		}

		$validation = $this->validation;
		$message = [];
		$valid = true;

		foreach ($validation as $field => $rulesString) {

			$message[$field] = [];
			$isarray = false;
			$isarray = preg_match("/\|array/", $rulesString);
			$rules = explode('|', $rulesString);

			foreach ($rules as &$rule) {
				$params = explode(':',$rule);
				$instruction = array_shift($params);

				if(count($params) > 0) {
					$params = explode(',',$params[0]);
				}
				

				$test = (isset($data[$field])) ? $data[$field] : null;

				

				if(is_null($test) && $instruction == 'required') {
						if(!$ignoreRequered) {
							$message[$field][$instruction] = "$field is required";
							$valid = false;
						}
				} else {
					switch($instruction) {

						case 'require_only':
							$rules[] = 'require_without:'.$params[0];
							$rules[] = 'without:'.$params[0];

							//var_dump($rules);

						break;

						case 'require_without':		
							//var_dump($rule);			
							//if($params[0] == 'auteurs_new' /* && $data['serie_id'] == 'test'*/) {
								/*var_dump($params[0]);
								var_dump(is_null($test));
								var_dump($test);
								var_dump(isset($data[$params[0]]));
								var_dump(is_null($test) && !isset($data[$params[0]]));
								var_dump('----------------------');
							}*/
							if(is_null($test) && !$ignoreRequered && !isset($data[$params[0]])) { // false && !false
								$message[$field]['required'] = "$field is required if {$params[0]} is not set";
								$valid = false;
							}
							break;
						case 'without':
							if (!is_null($test) && isset($data[$params[0]])) { // true && false
								$message[$field][$instruction] = "$field must not be set if {$params[0]} is set";
								$valid = false;
							}
							
							break;
						case 'numeric':
							if(!is_null($test) && !is_numeric($test)) {
								$message[$field][$instruction] = "$field must be a numeric";
								$valid = false;
							}
							break;
						case 'integer':
							if(!is_null($test) && !$this->isInteger($test)) {
								$message[$field][$instruction] = "$field must be an integer";
								$valid = false;
							}
							break;
						case 'min':
							if(!is_null($test)) {
								if(is_numeric($test)) {
									if($test < $params[0]) {
										$message[$field][$instruction] = "$field must be greater than {$params[0]}";
										$valid = false;								
									}
								} else {
									if(strlen($test) < $params[0]) {
										$message[$field][$instruction] = "$field must have {$params[0]} character or more";
										$valid = false;								
									}							
								}
							}
							break;
						case 'max':
							if(!is_null($test)) { 
								if(is_numeric($test)) {
									if($test > $params[0]) {
										$message[$field][$instruction] = "$field must be lesser than {$params[0]}";
										$valid = false;								
									}							
								} else {
									if(strlen($test) > $params[0]) {
										$message[$field][$instruction] = "$field must have {$params[0]} character or less";
										$valid = false;								
									}	
								}
							}
							break;
						case 'reference':
							if(!is_null($test)){
								$table = $params[0];
								$foreign_key = $params[1];
								if($isarray) {
	
									if(!is_array($test)) {
										$test = explode(',',substr($test, 1,strlen($test - 2)));
									}
	
									$ins = implode(',',array_fill(0,count($test),'?'));
	
									$this->prepare("SELECT count(*) FROM $table WHERE $foreign_key IN ($ins)");
									$args = $test;
								} else {
									$this->prepare("SELECT count(*) FROM $table WHERE $foreign_key = ?");
									$args = [$test];
								}
								
								$this->executePreparedStatement($args);
	
								$result = $this->fetch(PDO::FETCH_NUM);
	
								if($result[0] == '0') {
									$message[$field][$instruction] = "$field must be a value from {$table}";
									$valid = false;									
								}
							}
							break;
						case 'validator':
							if(!is_null($test)) {
								$fonction = array_shift($params);
								$foreign_key = (isset($params[0])) ? $params[0] : 'id';

								$values = $this->$fonction();

								$values_list = [];

								foreach ($values as $value) {
									$values_list[] = $value[$foreign_key];
								}

								if($isarray) {

									if(!is_array($test)) {
										$test = explode(',',substr($test,1,strlen($test - 2)));
									}

									foreach ($test as $value) {
										if(!in_array($value,$values_list)) {
											$message[$field][$instruction] = "$field must be a value from the validator $fonction";
											$valid = false;	
											break;
										}									
									}

								} else {
									if(!in_array($test,$values_list)) {
										$message[$field][$instruction] = "$field must be a value from the validator $fonction";
										$valid = false;	
									}
								}
							}
							break;
						case 'format':
							if(!is_null($test)) {
								$fonction = array_shift($params);
								$args = [];
								foreach ($params as $value) {
									$args[] = $data[$value];
								}
	
								if(!call_user_func_array([$this, $fonction],$args)) {
									$message[$field][$instruction] = "$field must be a valid format";
									$valid = false;										
								}
							}
							break;
						case 'array':
							if(!is_null($test)) {
								if(!is_array($test)) {
	
									preg_match("/^\[(.+)\]$/", $test, $result);
	
									if(count($result) == 0) {
										$message[$field][$instruction] = "$field must be an array";
										$valid = false;		
										break;
									} else {
										$test = explode(',',substr($test,1,strlen($test - 2)));
									}
									
								}
	
								$type = $params[0];
	
								foreach ($test as $value) {
									if($type == 'integer') {
										if(!$this->isInteger($value)) {
											$message[$field][$instruction.'_integer'] = "$field must be an array of integer";
											$valid = false;		
											break;										
										}
									}
	
								}			
							}			
							break;

					}					
				}

			}

			if(count($message[$field]) == 0)
			{
				unset($message[$field]);
			}
		}

		if(!$valid) {
			return $message;
		}

		return true;
	}

	private function isInteger($val)
	{
	    if (!is_scalar($val) || is_bool($val)) {
	        return false;
	    }
	    if (is_float($val + 0) && ($val + 0) > PHP_INT_MAX) {
	        return false;
	    }
	    return is_float($val) ? false : preg_match('~^((?:\+|-)?[0-9]+)$~', $val);
	}
}