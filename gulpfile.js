'use strict'

const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const concat = require('gulp-concat')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const gpBetterRollup = require('gulp-better-rollup')

const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')

const babel = require('gulp-babel')

sass.compiler = require('node-sass')

gulp.task('jsbuild', async function () {
  return gulp
    .src('./assets/js/**/*.js')
    .pipe(
      gpBetterRollup(
        {
          plugins: [
            babel({
              presets: ['@babel/preset-env'],
            }),
            resolve(),
            commonjs(),
          ],
        },
        'umd',
      ),
    )
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('dist'))
  // .pipe(rename('scripts.min.js'))
  // .pipe(uglify())
  // .pipe(gulp.dest('./public/js/'))
})

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

gulp.task('watch:sass', function () {
  gulp.watch('./assets/scss/**/*.scss', gulp.series('sass'))
})

gulp.task('watch:js', function () {
  gulp.watch('./assets/js/**/*.js', gulp.series('jsbuild'))
})

// gulp.task('watch', gulp.series('watch'))

// Default Task
// gulp.task('default', gulp.parallel('sass', 'sass:watch'))
