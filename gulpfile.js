var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');


gulp.task('minify-css', function() {
  return gulp.src('app/css/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('compress', function() {
  return gulp.src(['app/js/*.js', 'app/jasmine/*.js'])
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('default', ['minify-css', 'compress']);
