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
            src: ['src/App.ts'],
            dest: 'output/app/app.js'
        },

        tests: {
            src: ['src/tests/**/*.ts'],
            dest: 'output/tests/app.tests.js'
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
                  {expand: true, src: ['libs/jquery.js'], dest: 'output/app/', flatten: true}
              ]
          },
          release: {
              files: [
                  {expand: true, src: ['output/temp/index.min.html'], dest: 'output/release/index.html', flatten: true}
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

      htmlmin: {                                     // Task
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

  grunt.registerTask('mrproper', ['clean']);
  grunt.registerTask('app', ['mrproper','stylus:app','htmlmin', 'ngtemplates:app','typescript:app','preprocess:app',"copy:app"]);
  grunt.registerTask('release', ['app', 'stylus:release', 'preprocess:release','preprocess:config','copy:release','uglify','bump-only:patch']);
  grunt.registerTask('publish', ['ftp-deploy']);

  grunt.registerTask('tests', ['typescript:tests']);
};