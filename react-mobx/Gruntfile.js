module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    const pkg = grunt.file.readJSON('package.json');
    const version = pkg.version;

    var config = {
        pkg: pkg,

        babel: {
            options: {
                plugins: ['transform-react-jsx', 'transform-decorators-legacy'],
                sourceMap: true,
                presets: ['es2015', 'es2017', 'react', 'stage-1']
            },
            jsx: {
                files: [{
                    expand: true,
                    cwd: './src',
                    src: '**/*.jsx',
                    dest: 'dist',
                    ext: '.js'
                }]
            }
        },

        browserify: {
            dist: {
                cwd: './',
                files: {
                    ['dist/js/app-bundle.js']: 'dist/js/app.js'
                }
            }
        },

        template: {
            dev: {
                options: {
                    data: {version: pkg.version}
                },
                files: {
                    'dist/index.html': ['src/template-index.html']
                }
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'dist/css/styles.css': 'src/sass/styles.scss'
                }
            }
        },

        copy: {
            css: {
                src: './src/css/*',
                dest: 'dist/css/',
                flatten: true,
                expand: true,
                filter: 'isFile'
            },
            images: {
                src: './src/images/*',
                dest: 'dist/images/',
                flatten: true,
                expand: true,
                filter: 'isFile'
            }
        },

        watch: {
            scripts: {
                cwd: './src',
                files: ['**/*.jsx'],
                tasks: ['babel:jsx', 'browserify']
            },
            sass: {
                files: ['**/*.scss'],
                tasks: ['copy', 'sass']
            }
        }
    };


    grunt.initConfig(config);
    grunt.registerTask('dev', ['babel:jsx', 'browserify', 'copy', 'sass', 'template:dev']);
    grunt.registerTask('start', ['dev', 'watch']);
};
