module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    nodemon: {
      dev: {
        script: 'server.js'
      },
      options: {
        ignore: ['node_modules/**']
      }
    },

    uglify: {
      mainDist: {
        files: {
          'public/dist/built.min.js': 'public/dist/concat.js'
        }
      }
    },

    jshint: {
      files: [
        'public/client/**/*.js'
      ],
      options: {
        force: 'true',
        jshintrc: '.jshintrc',
        ignores: [
          'public/lib/**/*.js',
          'public/dist/**/*.js',
        ]
      }
    },

    cssmin: {
      minify: {
        expand: true,
        cwd: 'public/',
        src: 'style.css',
        dest: 'public/dist',
        ext: '.min.css'
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'jshint',
          'browserify:dev',
          'cssmin:minify'
        ]
      },
      options: {
        livereload: true
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    browserify: {
      main: {
        src: ['public/client/**/*.js'],
        dest: 'public/dist/concat.js'
      },
      dev: {
        src: ['public/client/**/*.js'],
        dest: 'public/dist/built.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('build', [
    'jshint',
    'browserify:main',
    'uglify',
    'cssmin:minify'
  ]);

  grunt.registerTask('build-dev', [
    'jshint',
    'browserify:dev',
    'cssmin:minify'
  ]);

  grunt.registerTask('deploy', ['build', 'server-dev']);
  grunt.registerTask('deploy-dev', ['build-dev', 'server-dev']);
};
