const gulp =require('gulp');
const gpConcat = require('gulp-concat');
const gpRename = require('gulp-rename');
const gpUglify = require('gulp-uglify');
const gpLess = require('gulp-less');
const gpBetterRollup = require('gulp-better-rollup');

const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

const babel = require('gulp-babel');

gulp.task('jsbuild', async function () {
    return gulp.src('./assets/js/**/*.js')
        .pipe(gpBetterRollup({ 
          plugins: [
              babel({
                presets: ['@babel/preset-env'] 
              }), 
              resolve(), 
              commonjs()
            ] 
          }, 
          'umd'))
        .pipe(gpConcat('concat.js'))
        .pipe(gulp.dest('dist'))
        .pipe(gpRename('scripts.min.js'))
        .pipe(gpUglify())
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('cssbuild',function(){
    return gulp.src('./assets/less/main.less')
        .pipe(gpLess())
        .pipe(gulp.dest('./public/css'));
 });

gulp.task('watch', () => {
   gulp.watch('./assets/js/**/*.js', gulp.series('jsbuild'));
   gulp.watch('./assets/less/**/*.less', gulp.series('cssbuild'));
});

gulp.task('watch', gulp.series('watch'));