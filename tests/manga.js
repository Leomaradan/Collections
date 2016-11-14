(function() {
			var valideData = {
					titre:"AI non-stop!",
					genre_id:"3",
					volume_possedes:[1,2,3,4,6,9,10,11,12],
					volume_max: 12,
					auteurs_id:[4]
			};

			var invalideData1 = {
					titre:"AI non-stop!",
					genre_id:"3",
					auteurs_id:[4]
			};

			var invalideData2 = {
					titre:"AI non-stop!",
					genre_id:"3",
					volume_possedes:'test',
					volume_max: "test",
					auteurs_id:[4]
			};	

			var invalideData3 = {
					titre:"AI non-stop!",
					genre_id:"3",
					volume_possedes:['1','2','3','4','6','test','10','11','12'],
					volume_max: 12,
					auteurs_id:[4]
			};	  	



	  	QUnit.module( "get manga" );

	  	QUnit.test("list", function(assert) {
	  		assert.expect( 1 );
			var done = assert.async( 1 );

			callApi('/manga', 'get', assert, function(data) { 
				assert.equal( data[0].titre, "Death Note", "Titre: Death Note" );
				done();
			});
		});

		QUnit.test("get by id", function(assert) {

	  		assert.expect( 2 );
			var done = assert.async( 1 );

			callApi('/manga/21', 'get', assert, function(data) { 
				assert.equal( data.id, 21, "1 mangas avec l'id 21" );
				assert.equal( data.auteurs[0].nom, "Ken Akamatsu", "Auteur: Ken Akamatsu" );
				done();
			});	
		});

		QUnit.test("filter by genre", function(assert) {

	  		assert.expect( 1 );
			var done = assert.async( 1 );

			callApi('/manga/genre/3', 'get', assert, function(data) { 
				assert.equal( data[2].titre, "Negima", "Titre: Negima" );
				done();
			});	
		});

		QUnit.test("list genre", function(assert) {

	  		assert.expect( 4 );
			var done = assert.async( 1 );

			callApi('/manga/info/genre', 'get', assert, function(data) { 
				assert.equal( data.length, 5, "5 genres possibles" );
				assert.equal( data[1].nom, "Livre en anglais", "2ème genre: Livre en anglais" );
				assert.equal( data[2].nom, "Science-Fiction", "3ème genre: Science-Fiction" );
				assert.equal( data[3].nom, "Seinen", "4ème genre: Seinen" );
				
				done();
			});			
		});

		QUnit.test("search without term", function(assert) {

	  		assert.expect( 1 );
			var done = assert.async( 1 );

			callApi('/manga/recherche', 'get', assert, function(data) { 
				assert.equal( data.error, "missing term in search", "Message d'erreur ok" );
				done();
			});				
		});

		QUnit.test("search: titre", function(assert) {

	  		assert.expect( 4 );
			var done = assert.async( 2 );

			callApi('/manga/recherche?titre=One', 'get', assert, function(data) { 
				assert.equal( data.length, 2, "2 mangas avec 'One' dans le titre" );
				assert.equal( data[0].auteurs[0].nom, "Eiichirō Oda", "Auteur: Eiichirō Oda" );
				done();
			});	

			callApi('/manga/recherche?auteurs=ba', 'get', assert, function(data) { 
				assert.equal( data.length, 1, "1 mangas avec 'ba' dans les auteurs" );
				assert.equal( data[0].titre, "Death Note", "Titre: Death Note" );
				done();
			});					
		});

		QUnit.test("search: titre and genre", function(assert) {

	  		assert.expect( 2 );
			var done = assert.async( 1 );

			callApi('/manga/recherche?titre=One&genre=Seinen', 'get', assert, function(data) { 
				assert.equal( data.length, 1, "1 mangas avec 'One' dans le titre et 'Seinen' dans le genre" );
				assert.equal( data[0].titre, "One Punch Man", "One Punch Man" );
				done();
			});	
		});

		QUnit.test("invalid search", function(assert) {

	  		assert.expect( 1 );
			var done = assert.async( 1 );

			callApi('/manga/recherche?invalide=rien', 'get', assert, function(data) { 
				assert.equal( data.length, 0, "0 résultat" );
				done();
			});	
		});

		QUnit.module( "validate manga" );

		QUnit.test("validate", function(assert) {

	  		assert.expect( 1 );
			var done = assert.async( 1 );

			callApi('/manga/validate', 'post', assert, function(data) { 
				assert.equal( data.ok, "ok", "contenu valide" );
				done();
			}, valideData);	
		});	

		QUnit.test("invalide", function(assert) {

	  		assert.expect( 10 );
			var done = assert.async( 3 );

			callApi('/manga/validate', 'post', assert, function(data) { 
				assert.notEqual( data.volume_possedes.required, undefined, "pas de volume_possedes" ); 
				assert.notEqual( data.volume_max.required, undefined, "pas de volume_max" ); 

				assert.equal(Object.keys(data).length, 2, "2 fields en erreurs");
				done();
			}, invalideData1);	

			callApi('/manga/validate', 'post', assert, function(data) { 
				assert.notEqual( data.volume_possedes.array, undefined, "volume_possedes en string" );
				assert.notEqual( data.volume_max.integer, undefined, "volume_max en string" );

				assert.equal( data.volume_possedes.array, "volume_possedes must be an array", "volume_possedes en array" );

				assert.equal(Object.keys(data).length, 2, "2 fields en erreurs");
				done();
			}, invalideData2);	

			callApi('/manga/validate', 'post', assert, function(data) { 
				assert.notEqual( data.volume_possedes.array_integer, undefined, "volume_possedes en array de string" );

				assert.equal( data.volume_possedes.array_integer, "volume_possedes must be an array of integer", "volume_possedes en array de string" );

				assert.equal(Object.keys(data).length, 1, "1 fields en erreurs");
				done();
			}, invalideData3);							
		});		

		QUnit.module( "CUD manga" );

		QUnit.test("create", function(assert) {

	  		assert.expect( 3 );
			var done = assert.async( 2 );

			callApi('/manga', 'get', assert, function(data) { 
				var len = data.length;
				callApi('/manga', 'post', assert, function(data) { 
					var id = data.id;
					callApi('/manga', 'get', assert, function(data) { 
						assert.equal( data.length, len+1, (len+1) + " mangas" );				
						done();
					});

					callApi('/manga/' + id, 'get', assert, function(data) { 
						assert.equal( data.volume_possedes, "1-4,6,9-12", "volumes possedés: 1-4,6,9-12 mangas" );				
						assert.equal( data.volume_max, "12", "volumes max: 12 mangas" );				
						done();
					});					
				}, valideData);	
			});

		});	

		QUnit.test("update", function(assert) {

	  		assert.expect( 2 );
			var done = assert.async( 1 );

				callApi('/manga', 'post', assert, function(data) { 
					var id = data.id;
					callApi('/manga/' + id, 'get', assert, function(data) { 
						assert.equal( data.titre, valideData.titre, "Titre: " + valideData.titre );
						callApi('/manga/' + id, 'put', assert, function(data) { 
							callApi('/manga/' + id, 'get', assert, function(data) { 
								assert.equal( data.titre, "test", "Titre: test" );			
								done();
							});
						}, {'titre': 'test'});	
					});				
				}, valideData);	
		});		

		QUnit.test("delete", function(assert) {

	  		assert.expect( 1 );
			var done = assert.async( 1 );

			callApi('/manga', 'post', assert, function(data) { 
				var id = data.id;
				callApi('/manga', 'get', assert, function(data) { 
					var len = data.length;
					callApi('/manga/' + id, 'delete', assert, function(data) { 
						callApi('/manga', 'get', assert, function(data) { 
							assert.equal( data.length, len-1, (len-1) + " mangas" );			
							done();
						});
					});	
				});
			}, valideData);

		});			

		QUnit.test("invalide", function(assert) {

	  		assert.expect( 10 );
			var done = assert.async( 3 );

			callApi('/manga', 'post', assert, function(data) { 
				assert.notEqual( data.volume_possedes.required, undefined, "pas de volume_possedes" ); 
				assert.notEqual( data.volume_max.required, undefined, "pas de volume_max" ); 

				assert.equal(Object.keys(data).length, 2, "2 fields en erreurs");
				done();
			}, invalideData1);	

			callApi('/manga', 'post', assert, function(data) { 
				assert.notEqual( data.volume_possedes.array, undefined, "volume_possedes en string" );
				assert.notEqual( data.volume_max.integer, undefined, "volume_possedes en string" );

				assert.equal( data.volume_possedes.array, "volume_possedes must be an array", "volume_possedes en array" );

				assert.equal(Object.keys(data).length, 2, "2 fields en erreurs");
				done();
			}, invalideData2);	

			callApi('/manga', 'post', assert, function(data) { 
				assert.notEqual( data.volume_possedes.array_integer, undefined, "volume_possedes en array de string" );

				assert.equal( data.volume_possedes.array_integer, "volume_possedes must be an array of integer", "volume_possedes en array de string" );

				assert.equal(Object.keys(data).length, 1, "1 fields en erreurs");
				done();
			}, invalideData3);							
		});			
	})();