  	QUnit.module( "get roman" );

  	QUnit.test("list", function(assert) {
  		assert.expect( 2 );
		var done = assert.async( 1 );

		callApi('/roman', 'get', assert, function(data) { 
			assert.equal( data.length, 7, "7 romans" );
			assert.equal( data[0].auteurs, "Isaac Asimov", "Auteur: Isaac Asimov" );
			done();
		});
	});

	QUnit.test("get by id", function(assert) {

  		assert.expect( 2 );
		var done = assert.async( 1 );

		callApi('/roman/1', 'get', assert, function(data) { 
			assert.equal( data.length, 1, "1 romans avec l'id 1" );
			assert.equal( data[0].auteurs, "Isaac Asimov", "Auteur: Isaac Asimov" );
			done();
		});	
	});

	QUnit.test("filter by genre", function(assert) {

  		assert.expect( 2 );
		var done = assert.async( 1 );

		callApi('/roman/genre/2', 'get', assert, function(data) { 
			assert.equal( data.length, 3, "3 romans du genre 2" );
			assert.equal( data[2].titre, "Seconde Fondation", "Titre: Seconde Fondation" );
			done();
		});	
	});

	QUnit.test("filter by serie", function(assert) {

  		assert.expect( 2 );
		var done = assert.async( 1 );

		callApi('/roman/serie/2', 'get', assert, function(data) { 
			assert.equal( data.length, 3, "3 romans de la série 2" );
			assert.equal( data[0].auteurs, "J.R.R. Tolkien", "Auteur: J.R.R. Tolkien" );
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
			assert.equal( data[0].genre, "Fantasy", "Genre: Fantasy" );
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
