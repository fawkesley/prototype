'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var handlebars = require("gulp-compile-handlebars");
var data = require('gulp-data');
var clean = require('gulp-clean');
var path = require('path');
var fs   = require('fs');
var rename     = require('gulp-rename');
var   connect = require('gulp-connect');
var shell = require('gulp-shell');



gulp.task('sass', function () {
  gulp.src('public/stylesheets/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/stylesheets'));
});

gulp.task('watch', function () {
  gulp.watch('public/stylesheets/**/*.scss', ['sass']);
  gulp.watch('public/javascripts/*.js', ['copy']);
  gulp.watch('public/images/**', ['copy']);
  gulp.watch('views/layouts/**', ['parse']);
  gulp.watch('data/**', ['parse']);

  // gulp.watch('public/**', ['restart']);

});

gulp.task('copy', function() {
   gulp.src('public/images/*')
   .pipe(gulp.dest('dist/images'));
   gulp.src('public/fonts/*')
   .pipe(gulp.dest('dist/fonts'));

   gulp.src('public/javascripts/*')
   .pipe(gulp.dest('dist/javascripts'));
});

// gulp.src("views/layouts/*.mustache")
//    .pipe(mustache(file.data))
//    .pipe(gulp.dest("dist"));
gulp.task('clean', function () {
    var stream = gulp.src('dist/', {read: false})
        .pipe(clean())
        .on('error', gutil.log);
    return stream;
});

gulp.task('parse', function () {
  var defaultData = {
    url: 'http://test.org/',
  };
  var handlebarOptions = {        batch : ['views/layouts/partials'] };
  return gulp.src(['views/layouts/*.hbs'])
    .pipe(data(function (file) {
      return require(metadataFile(file.path));
    }))
    .pipe(handlebars(defaultData, handlebarOptions))
    .pipe(rename(htmlify))
    .pipe(gulp.dest('dist'));
});

gulp.task('devserver', function() {
  connect.server({
    port: 8888,
    root: "dist"
  });
});


gulp.task('docker', shell.task([

  'docker build -t nhsproto .'
]));


function htmlify (path) {
  path.extname = '.html';
}

function metadataFile (templateFile) {
  var base = path.basename(templateFile, '.hbs');
  return path.resolve(__dirname, 'data', base + '.json');
}

gulp.task('build', ['sass', 'copy', 'parse','docker']);

gulp.task('default', ['sass', 'copy', 'watch', 'parse','devserver']);
