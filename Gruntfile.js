module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    manifest: {
      generate: {
        options: {
          basePath: 'public/',
          //cache: ['js/app.js', 'css/style.css'],
          network: ['*'],
          preferOnline: true,
          headcomment: " <%= pkg.name %> v<%= pkg.version %>",
          verbose: true,
          timestamp: true,
          hash: true,
          master: ['index.html'],
          process: function(path) {
            return path;
            //return path.substring('public/'.length);
          }
        },
        src: [
          '*.html',
            '*.js',
            '*.map',
            '*.css',
            'assets/**/*.*'
        ],
        dest: 'public/cache.manifest'
      }
    }
  });

grunt.loadNpmTasks('grunt-manifest');

grunt.registerTask('default', ['manifest']);

};