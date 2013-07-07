module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON( 'package.json' ),

less: {
  development: {
    options: {
      paths: ["css"]
    },
    files: {
      "css/main.css": "less/main.less"
    }
  },
  production: {
    options: {
      paths: ["css"],
      yuicompress: true
    },
    files: {
      "css/main.min.css": "less/main.less"
    }
  }
},
 // https://github.com/nDmitry/grunt-autoprefixer
    autoprefixer: {
      build: {
        options: {
          browsers: ['last 1 version', '> 1%', 'ie 8', 'ie 7']
        },
        files: [
          {
            src : ['**/**/main.css', '!**/**/*autoprefixed.css'],
            cwd : 'css',
            dest : 'css',
            ext : '.autoprefixed.css',
            expand : true
          }
        ]
      }
    },
assemble: {
      options: {
        flatten: true,
        layout: 'layout.hbs',
        layoutdir: 'src/templates/layouts',
        assets: 'dist/assets',
        partials: ['src/templates/pages/*.hbs']
      },
      demo: {
        options: {
          data: ['src/data/*.{json,yml}']
        },
        files: {
          'dist/': ['src/templates/pages/*.hbs']
        }
      }
    },
     copy: {
      demo: {
        files: [
          { expand: true, cwd: './css', src: ['./**/*.*'], dest: 'dist/assets/css' },
          { expand: true, cwd: './js', src: ['./**/*.*'], dest: 'dist/assets/js' }
        ]
      }
    }

  });

  // Default task
  grunt.registerTask('default', ['less', 'copy', 'assemble']);
  grunt.loadNpmTasks('assemble');
  
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};
