module.exports = function (grunt) {

    //Cargo los módulos de grunt automáticamente
    require('load-grunt-tasks')(grunt);

    //Leo el fichero package.json
    var pkg = grunt.file.readJSON('package.json');

    // Configuration
    var config = {
        app: 'src/main',
        target: 'target',
        dist: 'target/' + pkg.version,
        test: 'src/test',
        targetTest: 'target/test-results'
    };

    // Project configuration.
    grunt.initConfig({
        config: config,

        // Asks user for initialization data
        prompt: {
            webservice: {
                options: {
                    questions: [
                        {
                            config: 'input.webserviceurl',
                            type: 'input', // list, checkbox, confirm, input, password
                            message: 'URL del webservice',
                            default: 'http://localhost:8080/api'
                        }
                    ],
                    then: function (results, done) {
                        if (results['input.webserviceurl']) {
                            var str = results['input.webserviceurl'];
                            // console.log(results);
                            if (str.substr(-1) === '/') {
                                grunt.config.set('input.webserviceurl', str.substr(0, str.length - 1));
                            }
                            done();
                            return true;
                        } else {
                            grunt.fail.fatal('No se realizaron cambios');
                            return false;
                        }
                    }
                }
            }
        },

        // Replaces strings in files
        replace: {
            webservice: {
                options: {
                    patterns: [
                        {
                            // match: /(webServiceUrl:[ '"]{1,2})(http:\/\/localhost:8080)(\/['"]{1})/i,
                            // replacement: '$1<%= grunt.config("input.webserviceurl") %>$3'
                            match: /webServiceUrl: '[a-z0-9\\:\/]*/,
                            replacement: 'webServiceUrl: \'<%= grunt.config("input.webserviceurl") %>/'
                        }
                    ]
                },
                files: [
                    {src: ['<%= config.dist %>/js/scripts.js'], dest: '<%= config.dist %>/js/scripts.js'}
                ]
            }
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: ['<%= config.app %>/{,*/}*.js'],
                tasks: [],
                options: {
                    livereload: true
                }
            },
            styles: {
                files: ['<%= config.app %>/assets/css/{,*/}*.css'],
                tasks: [],
                options: {
                    livereload: true
                }
            },

            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.app %>/{,*/}*.html',
                    '<%= config.app %>/{,*/}*.php',
                    '.tmp/css/{,*/}*.css',
                    '<%= config.app %>/assets/img/{,*/}*'
                ]
            }
        },

        // Grunt server configuration
        connect: {
            options: {
                port: 80,
                open: true,
                livereload: 25742,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use('/bower_components', connect.static('./bower_components')),
                            connect.static(config.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    base: '<%= config.dist %>',
                    livereload: false
                }
            }
        },

        // PHP server
        php: {
            dev: {
                options: {
                    // Change this to '0.0.0.0' to access the server from outside
                    hostname: '127.0.0.1',
                    base: '<%= config.app %>',
                    port: 9002,
                    open: true,
                    keepalive: true
                }
            }
        },

        // Karma test runner config
        karma: {
            options: {
                configFile: 'karma.conf.js'
            },
            singlerun: {
                singleRun: true,
                reporters: ['nyan']
            },
            report: {
                singleRun: true,
                reporters: ['progress', 'coverage', 'junit']
            },
            dev: {
                reporters: ['nyan']
            }
        },

        casper: {
            functional: {
                options: {
                    test: true
                },
                files: {
                    '<%= config.targetTest %>/functional-tests-results.xml': ['<%= config.test %>/functional/functionalTests.js']
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                ignores: ['<%= config.app %>/app/vendor/**/*'],
                reporter: require('jshint-smart'),
                verbose: false
            },
            all: {
                files: {
                    src: ['<%= config.app %>/app/**/*.js']
                }
            }
        },
        jscs: {
            options: {
                config: '.jscsrc',
                excludeFiles: ['<%= config.app %>/app/vendor/**/*'],
                reporter: require('jscs-stylish').path
            },
            all: {
                files: {
                    src: ['<%= config.app %>/app/**/*.js']
                }
            }
        },


        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%= config.dist %>',
                flow: {
                    steps: {
                        //js: ['concat', 'uglify'],
                        js: ['concat'],
                        css: ['concat']
                    },
                    post: {}
                }
            },
            html: '<%= config.app %>/index.html'
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: [
                    '<%= config.dist %>/assets/',
                    '<%= config.dist %>/assets/img',
                    '<%= config.dist %>/assets/css'
                ]
            },
            html: ['<%= config.dist %>/{,*/}*.html'],
            css: ['<%= config.dist %>/assets/css/{,*/}*.css']
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= config.target %>/**/*',
                        '!<%= config.target %>/test-results',
                        '!<%= config.target %>/test-results/**/*'
                    ]
                }]
            },
            server: '.tmp',
            end: ['<%= config.target %>/archive-tmp', '.tmp'],
            test: ['<%= config.target %>/test-results'],
            init: '<%= config.app %>/index.<%= grunt.config("input.type") %>'
        },

        // Copy files
        copy: {
            dist: {
                files: [
                    /*{
                     expand: true, cwd: '<%= config.app %>/',
                     src: ['*.html', '*.php'], dest: '<%= config.dist %>/',
                     filter: 'isFile'
                     },*/
                    {
                        expand: true, cwd: '<%= config.app %>/',
                        src: ['**/*', '!assets/**/*.css', '!app/**/*.js'],
                        dest: '<%= config.dist %>/'
                    }
                ]
            }
        },

        // Empty folders
        cleanempty: {
            options: {
                files: false
            },
            src: ['<%= config.dist %>/**/*']
        },

        // Concurrent tasks
        concurrent: {
            dev: {
                tasks: ['watch'],
                options: {logConcurrentOutput: true}
            },
            devphp: {
                tasks: ['php:dev', 'watch'],
                options: {logConcurrentOutput: true}
            }
        },

        uglify: {
            pro: {
                files: {
                    '<%= config.dist %>/js/scripts.js': ['<%= config.dist %>/js/scripts.js'],
                    // '<%= config.dist %>/js/vendor.js': ['<%= config.dist %>/js/vendor.js'],
                }
            }
        }
    });

    //********************* ALIAS ***************************

    // Starts a development server for webapps
    grunt.registerTask('dev', 'use --allow-remote for remote access', function (target) {
        if (grunt.option('allow-remote')) {
            grunt.config.set('connect.options.hostname', '0.0.0.0');
        }
        grunt.config.set('connect.options.hostname', '0.0.0.0');

        grunt.task.run([
            'clean:server',
            'connect:livereload',
            'concurrent:dev'
        ]);
    });

    // Unit test runner
    grunt.registerTask('test', [
        'karma:singlerun',
        'clean:test'
    ]);

    // Functional test runner
    grunt.registerTask('test-functional', [
        'casper:functional'
    ]);

    // Test runner with coverage
    grunt.registerTask('test-coverage', [
        'clean:test',
        'karma:report'
    ]);

    // JShint + JSCS runner
    grunt.registerTask('sonar', '', function () {
        // Use the force option for all tasks declared in the previous line
        grunt.option('force', true);
        grunt.task.run([
            'jshint:all',
            'jscs:all'
        ]);
    });

    // simple build task
    grunt.registerTask('build-pro', [
        'clean:dist',
        'copy:dist',
        'useminPrepare',
        'concat:generated',
        'cssmin:generated',
        'uglify:generated',
        'usemin',
        'uglify:pro',
        'cleanempty',
        'clean:end',
        'prompt:webservice',
        'replace:webservice'
    ]);

    // simple build task
    grunt.registerTask('build', [
        'clean:dist',
        'copy:dist',
        'useminPrepare',
        'concat:generated',
        'usemin',
        'uglify:pro',
        'cleanempty',
        'clean:end',
        'prompt:webservice',
        'replace:webservice'
    ]);

    grunt.registerTask('prueba', [
        'uglify:pro'
    ]);


    // Package the dist.
    // 'build' for HTML+Javascript project
    // 'build-php' for PHP project
    grunt.registerTask('default', ['build']);
};
