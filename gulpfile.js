'use strict'

var gulp = require('gulp')
var sass = require('gulp-sass')(require('sass'))
var concat = require('gulp-concat')

sass.compiler = require('node-sass')

gulp.task('sass', function () {
  return (
    gulp
      // .src('./assets/scss/**/*.scss')
      .src('./assets/scss/main.scss')
      .pipe(concat('styles.min.scss'))
      .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
      .pipe(gulp.dest('./dist/'))
  )
})

gulp.task('sass:watch', function () {
  gulp.watch('./assets/scss/**/*.scss', gulp.series('sass'))
})

// Default Task
// gulp.task('default', gulp.parallel('sass', 'sass:watch'))
