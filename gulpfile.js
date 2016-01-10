var gulp = require('gulp');
var jshint = require('gulp-jshint');
var webserver = require('gulp-webserver');

gulp.task('default', ['webserver', 'watch']);

gulp.task('lint', function() {
  return gulp.src('./js/main.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('watch', function(){
  gulp.watch('./js/main.js',['lint']);
});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true,
      port: 9000
    }));
});