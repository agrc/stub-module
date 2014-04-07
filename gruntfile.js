/* jshint camelcase: false */
module.exports = function (grunt) {
    var lintFiles = [
        'gruntfile.js',
        'src/**/*.js',
        'tests/**/*.js'
    ];

    grunt.initConfig({
        jasmine: {
            'default': {
                options: {
                    specs: ['tests/spec/Spec*.js'],
                    vendor: [
                        'tests/testBootstrap.js',
                        'bower_components/dojo/dojo.js'
                    ],
                    host: 'http://localhost:8000',
                    keepRunner: true
                }
            }
        },
        jshint: {
            files: lintFiles,
            options: {
                jshintrc: '.jshintrc'
            }
        },
        watch: {
            files: lintFiles,
            options: {
                livereload: true
            },
            tasks: ['jshint', 'jasmine:default:build']
        },
        connect: {
            uses_defaults: {}
        },
        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                commitFiles: ['-a'],
                pushTo: 'origin'
            }
        }
    });

    // Register tasks.
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-bump');

    // Default task.
    grunt.registerTask('default', ['jasmine:default:build', 'jshint', 'connect', 'watch']);

    grunt.registerTask('travis', ['jshint', 'connect', 'jasmine:default']);
};
