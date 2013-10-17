module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    ngtemplates: {
      app:       {
          cwd:          'output/temp/src',
          src:          '**/*.html',
          dest:         'output/app/views.js',

          options:      {
            module:     'unleashedEx'
          }
      }
    },

    typescript: {
        app: {
            src: ['src/**/*.ts','src/App.ts','!src/**/*Tests.ts'],
            dest: 'output/app/app.js'
        },

        tests: {
            src: ['src/**/*Tests.ts'],
            dest: 'output/tests/tests.js'
        }
    },

    uglify: {
      default: {
        files: {
          'output/release/app-<%= pkg.version %>.min.js': ['output/app/app.js','output/app/views.js']
        }
      }
    },

    clean : {
        app : {
            src : [ "output/**/*", 
                    "tests/**/*.js",
                    "tests/**/*.map",
                    "src/**/*.js",
                    "src/**/*.map"
            ]
        }
    },

    preprocess : {
        options: {
            context : {
                VERSION: "<%= pkg.version %>"
            }
        },
        app : {
            src : 'index.tpl.html',
            dest : 'output/app/index.html',
            options: {
                context : {
                    APP : true
                }
            }
        },
        release : {
            src : 'index.tpl.html',
            dest : 'output/release/index.html',
            options: {
                context : {
                    RELEASE : true
                }
            }
        },
        config : {
            src : 'web.tpl.config',
            dest : 'output/release/web.config'
        }
      },

      stylus: {
        app: {
          files: {
              'output/app/style.css': ['src/**/*.styl']
          }
        },
        release: {
          files: {
              'output/release/style-<%= pkg.version %>.min.css': 'src/shared/app.styl'
          }
        }
      },

      copy: {
          app: {
              files: [
                  {expand: true, src: ['libs/angular.js'], dest: 'output/app/', flatten: true},
                  {expand: true, src: ['libs/jquery.js'], dest: 'output/app/', flatten: true},
                  {expand: true, src: ['libs/bootstrap.js'], dest: 'output/app/', flatten: true},
                  {expand: true, src: ['libs/bootstrap.css'], dest: 'output/app/', flatten: true}
              ]
          },
          release: {
              files: [
                  {expand: true, src: ['output/temp/index.min.html'], dest: 'output/release/index.html', flatten: true}
              ]
          },
          tests: {
              files: [
                  {expand: true, src: ['libs/angular.js'], dest: 'output/tests/', flatten: true},
                  {expand: true, src: ['libs/jquery.js'], dest: 'output/tests/', flatten: true},
                  {expand: true, src: ['libs/mocha.js'], dest: 'output/tests/', flatten: true},
                  {expand: true, src: ['libs/mocha.css'], dest: 'output/tests/', flatten: true},
                  {expand: true, src: ['tests.html'], dest: 'output/tests/', flatten: true},
                  {expand: true, src: ['libs/chai.js'], dest: 'output/tests/', flatten: true}
              ]
          }
      },

      'ftp-deploy': {
          prod: {
              auth: {
                  host: 'waws-prod-hk1-001.ftp.azurewebsites.windows.net',
                  port: 21,
                  authKey: 'diosftp'
              },
              src: 'output/release',
              dest: '/site/wwwroot'
          }
      },

      cssmin: {
          minify: {
              files: {
                  'output/release/style-<%= pkg.version %>.min.css': ['output/app/style.css']
              }
          }
      },

      htmlmin: {
        dist: {
              options: {
                  removeComments: true,
                  collapseWhitespace: true
              },
              expand: true,
              src: ['src/**/*.html'],
              dest: 'output/temp/'
        }
      },

      watch: {
        typescript: {
          files: ['src/**/*.ts'],
          tasks: ['app','tests'],
          options: {
            spawn: false,
            livereload: true
          },
        },

        css: {
          files: ['src/**/*.styl'],
          tasks: ['stylus:app'],
          options: {
            spawn: false,
            livereload: true
          }
        },

        html: {
          files: ['src/**/*.html'],
          tasks: ['html','tests'],
          options: {
            spawn: false,
            livereload: true
          }
        }
      },

		mocha_phantomjs: {
			all: ['output/tests/tests.html']
		},

      bump: {
          options: {
            files: ['package.json'],
            updateConfigs: [],
            commit: false,
            commitMessage: 'Release v%VERSION%',
            commitFiles: ['package.json'], // '-a' for all files
            createTag: false,
            tagName: 'v%VERSION%',
            tagMessage: 'Version %VERSION%',
            push: false,
            pushTo: 'upstream',
            gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
          }
      }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-ftp-deploy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-phantomjs');

  grunt.registerTask('mrproper', ['clean']);
  grunt.registerTask('html', ['htmlmin', 'ngtemplates:app']);
  grunt.registerTask('app', ['mrproper','stylus:app','html','typescript:app','preprocess:app',"copy:app"]);
  grunt.registerTask('release', ['app', 'stylus:release', 'preprocess:release','preprocess:config','copy:release','uglify','bump-only:patch']);
  grunt.registerTask('publish', ['ftp-deploy']);

  grunt.registerTask('tests', ['copy:tests','typescript:tests', 'mocha_phantomjs']);
};

