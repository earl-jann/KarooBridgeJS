
module.exports = function(grunt)
{
  var DIST_DIR = 'dist';

  var pkg = grunt.file.readJSON('package.json');

  // Project configuration.
  grunt.initConfig(
  {
    pkg:   pkg,
    // Plugins configuration
    clean:
    {
      generated_code: [DIST_DIR, 'src'],
    },

    // Generate browser versions and mapping debug file
    browserify:
    {
      require:
      {
        src:  '<%= pkg.main %>',
        dest: DIST_DIR+'/<%= pkg.name %>_require.js'
      },
      standalone:
      {
        src:  '<%= pkg.main %>',
        dest: DIST_DIR+'/<%= pkg.name %>.js',
        options:
        {
          transform: [["babelify", { "presets": ["es2015"] }]],
          browserifyOptions: {
            debug: true,
            standalone: 'KarooBridgeJS'
          }
        }
      },

      'require minified':
      {
        src:  '<%= pkg.main %>',
        dest: DIST_DIR+'/<%= pkg.name %>_require.min.js',

        options:
        {
          transform: [["babelify", { "presets": ["es2015"] }]],
          debug: true,
          browserifyOptions: {
            debug: true,
            standalone: 'KarooBridgeJS'
          },
          plugin: [
            ['minifyify',
             {
               compressPath: DIST_DIR,
               map: '<%= pkg.name %>.map'
             }]
          ]
        }
      },

      'standalone minified':
      {
        src:  '<%= pkg.main %>',
        dest: DIST_DIR+'/<%= pkg.name %>.min.js',

        options:
        {
          transform: [["babelify", { "presets": ["es2015"] }]],
          debug: true,
          browserifyOptions: {
            debug: true,
            standalone: 'KarooBridgeJS'
          },
          plugin: [
            ['minifyify',
             {
               compressPath: DIST_DIR,
               map: '<%= pkg.name %>.map',
               output: DIST_DIR+'/<%= pkg.name %>.map'
             }]
          ]
        }
      },

      'test.html':
      {
        src:  'test.js',
        dest: DIST_DIR+'/<%= pkg.name %>.test.js',

        options:
        {
          transform: [["babelify", { "presets": ["es2015"] }]],
          debug: true,
          browserifyOptions: {
            debug: true,
            standalone: 'KarooBridgeJS'
          },
          plugin: [
            ['minifyify',
             {
               compressPath: DIST_DIR,
               map: '<%= pkg.name %>.test.map',
               output: DIST_DIR+'/<%= pkg.name %>.test.map'
             }]
          ]
        }
      }

    },

    // Generate bower.json file from package.json data
    sync:
    {
      bower:
      {
        options:
        {
          sync: [
            'name', 'description', 'license', 'keywords', 'homepage',
            'repository'
          ],
          overrides: {
            authors: (pkg.author ? [pkg.author] : []).concat(pkg.contributors || [])
          }
        }
      }
    },
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-npm2bower-sync');
  grunt.loadNpmTasks('grunt-shell');

  // Alias tasks
  grunt.registerTask('default', ['clean', 'browserify']);
};
