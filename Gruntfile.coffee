module.exports = (grunt) ->

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

  grunt.loadTasks 'tasks'

  grunt.registerTask 'build', [
    'clean:build'
    'emberTemplates'
    'build-index'
    'browserify'
  ]
  grunt.registerTask 'default', ['build', 'watch']

  grunt.initConfig
    watch:
      #testTemplates:
        #files: ['test/**/*.hbs']
        #tasks: ['emberTemplates:test']
      js:
        files: ['app/**/*.js']
        tasks: ['browserify']
      templates:
        files: ['app/templates/**/*.hbs']
        tasks: ['emberTemplates:app', 'browserify']

    emberTemplates:
      options:
        templateCompilerPath: 'bower_components/ember-template-compiler/index.js'
        handlebarsPath: 'bower_components/handlebars/handlebars.js'
      app:
        options:
          templateBasePath: 'app/templates/'
        files:
          'app/.templates.js': 'app/templates/{,*/}*.hbs'
      #test:
        #options:
          #templateBasePath: 'test/support/'
        #files:
          #'test/support/templates.js': 'test/support/{,*/}*.hbs'

    browserify:
      options:
        shim:
          jquery:
            path: 'bower_components/jquery/jquery.js'
            exports: 'jQuery'
          handlebars:
            path: 'bower_components/handlebars/handlebars.runtime.js'
            exports: 'Handlebars'
          ember:
            path: 'bower_components/ember/ember.js'
            exports: 'Ember'
            depends:
              handlebars: 'Handlebars'
              jquery: 'jQuery'
      dev:
        options:
          debug: yes
        files:
          'build/application.js': ['app/.index.js']

    clean:
      build: ['build']

