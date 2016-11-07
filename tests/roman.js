(function() {		
		var valideData1 = {titre:"Fondation Foudroyée",
					serie_id:"1",
					genre_id:"2",
					couverture:"",
					volume:"4",
					auteurs_id:[2,1]
		};

		var valideData2 = {titre:"Moi, Asimov",
					genre_new:{nom:'Autobiographie',type_id:5},
					couverture:"",
					volume:"1",
					auteurs_id:[1]
		};

		var valideData3 = {titre:"De bons présages",
					genre_id:1,
					couverture:"",
					volume:"1",
					auteurs_new:[{nom: 'Terry Pratchett'},{nom: 'Neil Gaiman'}]
		};		

		var invalideData1 = {
					serie_id:"test",
					genre_id:"test"
		};

		var invalideData2 = {titre:"F",
					serie_id:"99",
					volume:"test",
					auteurs_id:'test'
		};	

		var invalideData3 = {titre:"Fondaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaation",
					serie_id:"4",
					genre_id:"99",
					volume:"1",
					auteurs_id:['test']
		};

		var invalideData4 = {titre:"Fondation",
					serie_id:"1",
					genre_id:"3",
					volume:"1",
					auteurs_id:[99]
		};		  	



  	QUnit.module( "get roman" );

  	QUnit.test("list", function(assert) {
  		assert.expect( 1 );
		var done = assert.async( 1 );

		callApi('/roman', 'get', assert, function(data) { 
			assert.equal( data[0].auteurs[0].nom, "Isaac Asimov", "Auteur: Isaac Asimov" );
			done();
		});
	});

	QUnit.test("get by id", function(assert) {

  		assert.expect( 2 );
		var done = assert.async( 1 );

		callApi('/roman/1', 'get', assert, function(data) { 
			assert.equal( data.length, 1, "1 romans avec l'id 1" );
			assert.equal( data[0].auteurs[0].nom, "Isaac Asimov", "Auteur: Isaac Asimov" );
			done();
		});	
	});

	QUnit.test("filter by genre", function(assert) {

  		assert.expect( 1 );
		var done = assert.async( 1 );

		callApi('/roman/genre/2', 'get', assert, function(data) { 
			assert.equal( data[2].titre, "Seconde Fondation", "Titre: Seconde Fondation" );
			done();
		});	
	});

	QUnit.test("filter by serie", function(assert) {

  		assert.expect( 2 );
		var done = assert.async( 1 );

		callApi('/roman/serie/2', 'get', assert, function(data) { 
			assert.equal( data.length, 3, "3 romans de la série 2" );
			assert.equal( data[0].auteurs[0].nom, "J.R.R. Tolkien", "Auteur: J.R.R. Tolkien" );
			done();
		});	
	});

	QUnit.test("filter by serie null", function(assert) {

  		assert.expect( 3 );
		var done = assert.async( 1 );

		callApi('/roman/serie', 'get', assert, function(data) { 
			assert.equal( data.length, 1, "1 romans sans série" );
			assert.equal( data[0].titre, "Bilbo le Hobbit", "Titre: Bilbo le Hobbit" );
			assert.equal( data[0].id, "7", "ID: 7" );
			done();
		});		
	});

	QUnit.test("list genre", function(assert) {

  		assert.expect( 4 );
		var done = assert.async( 1 );

		callApi('/roman/info/genre', 'get', assert, function(data) { 
			assert.equal( data.length, 4, "4 genres possibles" );
			assert.equal( data[1].nom, "Science-Fiction", "2ème genre: Science-Fiction" );
			assert.equal( data[2].nom, "Roman Policier", "3ème genre: Roman Policier" );
			assert.equal( data[3].nom, "Livre en anglais", "4ème genre: Livre en anglais" );
			done();
		});			
	});

	QUnit.test("list serie", function(assert) {

  		assert.expect( 2 );
		var done = assert.async( 1 );

		callApi('/roman/info/serie', 'get', assert, function(data) { 
			assert.equal( data.length, 2, "2 series possibles" );
			assert.equal( data[0].nom, "Fondation", "Titre: Fondation" );
			done();
		});		
	});

	QUnit.test("search without term", function(assert) {

  		assert.expect( 1 );
		var done = assert.async( 1 );

		callApi('/roman/recherche', 'get', assert, function(data) { 
			assert.equal( data.error, "missing term in search", "Message d'erreur ok" );
			done();
		});				
	});

	QUnit.test("search: titre 'Seigneur'", function(assert) {

  		assert.expect( 2 );
		var done = assert.async( 1 );

		callApi('/roman/recherche?titre=Seigneur', 'get', assert, function(data) { 
			assert.equal( data.length, 3, "3 romans avec 'Seigneur' dans le titre" );
			assert.equal( data[0].genre.nom, "Fantasy", "Genre: Fantasy" );
			done();
		});			
	});

	QUnit.test("search: titre 'Roi' and serie 'Seigneur'", function(assert) {

  		assert.expect( 2 );
		var done = assert.async( 1 );

		callApi('/roman/recherche?titre=Roi&serie=Seigneur', 'get', assert, function(data) { 
			assert.equal( data.length, 1, "1 romans avec 'Roi' dans le titre et 'Seigneur' dans la série" );
			assert.equal( data[0].titre, "Le Seigneur des Anneaux - Le Retour du Roi", "Titre: Le Seigneur des Anneaux - Le Retour du Roi" );
			done();
		});	
	});

	QUnit.test("invalid search", function(assert) {

  		assert.expect( 1 );
		var done = assert.async( 1 );

		callApi('/roman/recherche?invalide=rien', 'get', assert, function(data) { 
			assert.equal( data.length, 0, "0 résultat" );
			done();
		});	
	});

	QUnit.module( "validate roman" );

	QUnit.test("validate", function(assert) {

  		assert.expect( 3 );
		var done = assert.async( 3 );

		callApi('/roman/validate', 'post', assert, function(data) { 
			assert.equal( data.ok, "ok", "contenu valide" );
			done();
		}, valideData1);	

		callApi('/roman/validate', 'post', assert, function(data) { 
			assert.equal( data.ok, "ok", "contenu valide" );
			done();
		}, valideData2);		

		callApi('/roman/validate', 'post', assert, function(data) { 
			assert.equal( data.ok, "ok", "contenu valide" );
			done();
		}, valideData3);			
	});	

	QUnit.test("invalide", function(assert) {

  		assert.expect( 22 );
		var done = assert.async( 4 );

		callApi('/roman/validate', 'post', assert, function(data) { 
			assert.notEqual( data.titre.required, undefined, "pas de titre" ); 
			assert.notEqual( data.serie_id.integer, undefined, "serie en string" ); 
			assert.notEqual( data.genre_id.integer, undefined, "genre en string" ); 
			assert.notEqual( data.volume.required, undefined, "pas de volume" ); 
			assert.notEqual( data.auteurs_id.required, undefined, "pas d'auteur" );

			assert.equal(Object.keys(data).length, 5, "5 fields en erreurs");
			done();
		}, invalideData1);	

		callApi('/roman/validate', 'post', assert, function(data) { 
			assert.notEqual( data.titre.min, undefined, "titre trop court" );
			assert.notEqual( data.serie_id.reference, undefined, "serie pas dans la table" );
			assert.notEqual( data.genre_id.required, undefined, "pas de genre" );
			assert.notEqual( data.volume.integer, undefined, "volume en string" );
			assert.notEqual( data.auteurs_id.array, undefined, "auteur en string" );

			assert.equal( data.auteurs_id.array, "auteurs_id must be an array", "auteur en array de string" );

			assert.equal(Object.keys(data).length, 5, "5 fields en erreurs");
			done();
		}, invalideData2);	

		callApi('/roman/validate', 'post', assert, function(data) { 
			assert.notEqual( data.titre.max, undefined, "titre trop long" );
			assert.notEqual( data.serie_id.validator, undefined, "serie pas dans le validator" );
			assert.notEqual( data.genre_id.reference, undefined, "genre pas dans la table" );
			assert.notEqual( data.auteurs_id.array_integer, undefined, "auteur en array de string" );

			assert.equal( data.auteurs_id.array_integer, "auteurs_id must be an array of integer", "auteur en array de string" );

			assert.equal(Object.keys(data).length, 4, "4 fields en erreurs");
			done();
		}, invalideData3);	

		callApi('/roman/validate', 'post', assert, function(data) { 
			assert.notEqual( data.genre_id.validator, undefined, "genre pas dans le validator" );
			assert.notEqual( data.auteurs_id.reference, undefined, "auteur pas dans la table" );

			assert.equal(Object.keys(data).length, 2, "2 fields en erreurs");
			done();
		}, invalideData4);							
	});		

	QUnit.module( "CUD roman" );

	QUnit.test("create", function(assert) {

  		assert.expect( 2 );
		var done = assert.async( 2 );

		callApi('/roman', 'get', assert, function(data) { 
			var len = data.length;
			callApi('/roman', 'post', assert, function(data) { 
				callApi('/roman', 'get', assert, function(data) { 
					assert.notEqual( data.length, len, (len+1) + " romans" );				
					done();
				});
			}, valideData1);	
		});

		callApi('/roman', 'get', assert, function(data) { 
			var len = data.length;
			callApi('/roman', 'post', assert, function(data) { 
				callApi('/roman', 'get', assert, function(data) { 
					assert.notEqual( data.length, len, (len+1) + " romans" );				
					done();
				});
			}, valideData2);	
		});	

		callApi('/roman', 'get', assert, function(data) { 
			var len = data.length;
			callApi('/roman', 'post', assert, function(data) { 
				callApi('/roman', 'get', assert, function(data) { 
					assert.notEqual( data.length, len, (len+1) + " romans" );				
					done();
				});
			}, valideData3);	
		});				

	});	

	QUnit.test("update", function(assert) {

  		assert.expect( 3 );
		var done = assert.async( 2 );

			callApi('/roman', 'post', assert, function(data) { 
				var id = data.id;
				callApi('/roman/' + id, 'get', assert, function(data) { 
					assert.equal( data[0].titre, valideData1.titre, "Titre: " + valideData1.titre );
					callApi('/roman/' + id, 'put', assert, function(data) { 
						callApi('/roman/' + id, 'get', assert, function(data) { 
							assert.equal( data[0].titre, "test", "Titre: test" );			
							done();
						});
					}, {'titre': 'test'});	
				});				
			}, valideData1);	

			callApi('/roman', 'post', assert, function(data) { 
				var id2 = data.id;
				callApi('/roman/' + id2, 'get', assert, function(data) { 
					callApi('/roman/' + id2, 'put', assert, function(data) { 
						callApi('/roman/' + id2, 'get', assert, function(data) { 
							assert.equal( data[0].auteurs[0].nom, "Jack Vance", "Auteur: Jack Vance" );			
							done();
						});
					}, {'auteurs_new': [{nom: 'Jack Vance'}]});	
				});				
			}, valideData2);				
	});		

	QUnit.test("delete", function(assert) {

  		assert.expect( 1 );
		var done = assert.async( 1 );

		callApi('/roman', 'post', assert, function(data) { 
			var id = data.id;
			callApi('/roman', 'get', assert, function(data) { 
				var len = data.length;
				callApi('/roman/' + id, 'delete', assert, function(data) { 
					callApi('/roman', 'get', assert, function(data) { 
						assert.equal( data.length, len-1, (len-1) + " romans" );			
						done();
					});
				});	
			});
		}, valideData1);

	});			

	QUnit.test("invalide", function(assert) {

  		assert.expect( 22 );
		var done = assert.async( 4 );

		callApi('/roman', 'post', assert, function(data) { 
			assert.notEqual( data.titre.required, undefined, "pas de titre" ); 
			assert.notEqual( data.serie_id.integer, undefined, "serie en string" ); 
			assert.notEqual( data.genre_id.integer, undefined, "genre en string" ); 
			assert.notEqual( data.volume.required, undefined, "pas de volume" ); 
			assert.notEqual( data.auteurs_id.required, undefined, "pas d'auteur" );

			assert.equal(Object.keys(data).length, 5, "5 fields en erreurs");
			done();
		}, invalideData1);	

		callApi('/roman', 'post', assert, function(data) { 
			assert.notEqual( data.titre.min, undefined, "titre trop court" );
			assert.notEqual( data.serie_id.reference, undefined, "serie pas dans la table" );
			assert.notEqual( data.genre_id.required, undefined, "pas de genre" );
			assert.notEqual( data.volume.integer, undefined, "volume en string" );
			assert.notEqual( data.auteurs_id.array, undefined, "auteur en string" );

			assert.equal( data.auteurs_id.array, "auteurs_id must be an array", "auteur en array de string" );

			assert.equal(Object.keys(data).length, 5, "5 fields en erreurs");
			done();
		}, invalideData2);	

		callApi('/roman', 'post', assert, function(data) { 
			assert.notEqual( data.titre.max, undefined, "titre trop long" );
			assert.notEqual( data.serie_id.validator, undefined, "serie pas dans le validator" );
			assert.notEqual( data.genre_id.reference, undefined, "genre pas dans la table" );
			assert.notEqual( data.auteurs_id.array_integer, undefined, "auteur en array de string" );

			assert.equal( data.auteurs_id.array_integer, "auteurs_id must be an array of integer", "auteur en array de string" );

			assert.equal(Object.keys(data).length, 4, "4 fields en erreurs");
			done();
		}, invalideData3);	

		callApi('/roman', 'post', assert, function(data) { 
			assert.notEqual( data.genre_id.validator, undefined, "genre pas dans le validator" );
			assert.notEqual( data.auteurs_id.reference, undefined, "auteur pas dans la table" );

			assert.equal(Object.keys(data).length, 2, "2 fields en erreurs");
			done();
		}, invalideData4);							
	});			
})();