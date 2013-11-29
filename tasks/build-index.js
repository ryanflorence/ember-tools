module.exports = function(grunt) {
  grunt.registerTask('build-index', function() {
    require('loom')('index', this.async());
  });
};

