const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const refresh = require('gulp-refresh');
const sass = require('gulp-sass');
const minify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

//Complie Sass
gulp.task('sass', function () {
  return gulp.src('sass/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 7 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('assets/css'))
    .pipe(refresh());
});

//Optimize Images
gulp.task('imageMin', function(){
  gulp.src('assets/images/*')
      .pipe(imagemin())
      .pipe(gulp.dest('assets/images'));
});

//Minify JS
gulp.task('minify', function(){
  gulp.src('assets/js/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('assets/js'));
});

//Watch Task
gulp.task('watch', function () {
  refresh.listen()
  gulp.watch('sass/**/*.sass', ['sass']);
});

gulp.task('serve', ['sass'], function(){
  browserSync.init({
    server: './'
  });
});

//Default
gulp.task('default', ['serve'], function(){
  gulp.watch(['./**/*.html']).on('change', browserSync.reload);
  gulp.watch(['assets/images/*'], ['imageMin']);
  gulp.watch(['sass/**/*.sass'], ['sass']).on('change', browserSync.reload);
  gulp.watch(['assets/js/*.js'], ['minify']);
});
