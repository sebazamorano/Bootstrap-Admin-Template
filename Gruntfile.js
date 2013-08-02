module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                options: {
                    paths: ["css"]
                },
                files:
                        [
                            {"css/main.css": "src/assets/less/style.less"},
                            {"css/layout2.css": "src/assets/less/layout2.less"}
                        ]
            },
            production: {
                options: {
                    paths: ["css"],
                    yuicompress: true
                },
                files:
                        [
                            {"css/main.min.css": "src/assets/less/style.less"},
                            {"css/layout2.min.css": "src/assets/less/layout2.less"}
                        ]
            }
        },
        assemble: {
            // Task-level options
            options: {
                assets: 'dist/assets',
                data: 'src/**/*.{json,yml}',
                partials: [
                    'src/templates/partials/**/*.hbs',
                    'src/content/*.hbs'
                ],
                helpers: ['src/helper/**/*.js']
            },
            pages: {
                // Target-level options
                options: {
                    flatten: true,
                    layout: 'src/templates/layouts/default.hbs',
                    helpers: ['src/helper/**/*.js']
                },
                files: [
                    {expand: true, cwd: 'src/templates/pages', src: ['*.hbs'], dest: 'dist/'}
                ]
            },
            login: {
                options: {
                    layout: 'src/templates/layouts/login.hbs'
                },
                files: [
                    {expand: true, cwd: 'src/templates/login', src: ['login.hbs'], dest: 'dist/'}
                ]
            },
            errors: {
                options: {
                    layout: 'src/templates/layouts/errors.hbs'
                },
                files: [
                    {expand: true, cwd: 'src/templates/errors', src: ['*.hbs'], dest: 'dist/'}
                ]
            },
            countdown: {
                options: {
                    layout: 'src/templates/layouts/countdown.hbs'
                },
                files: [
                    {expand: true, cwd: 'src/templates/countdown', src: ['*.hbs'], dest: 'dist/'}
                ]
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, cwd: './css', src: ['./**/*.*'], dest: 'dist/assets/css'},
                    {expand: true, cwd: './js', src: ['./**/*.*'], dest: 'dist/assets/js'},
                    {expand: true, cwd: 'src/assets', src: ['./**/*.*', '!./submodule/**/*.*'], dest: 'dist/assets'}
                ]
            },
            submodule: {
                files: [
                    {expand: true, cwd: 'src/assets/submodule', src: ['./**/*.*'], dest: 'dist/assets'}
                ]
            }
        }

    });

    // Default task
    grunt.registerTask('default', ['less', 'copy', 'assemble']);
    grunt.loadNpmTasks('assemble');

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};
