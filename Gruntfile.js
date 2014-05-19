module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: 'public/client/**/*.js',
        dest: 'public/dist/concat.js'
      }
    },

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
          'public/dist/**/*.js'
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
          'concat',
          'uglify'
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
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon' ]);
    grunt.task.run([ 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('build', [
    'jshint',
    'concat',
    'uglify',
    'cssmin:minify'
  ]);

  grunt.registerTask('deploy', ['build', 'server-dev']);
};
