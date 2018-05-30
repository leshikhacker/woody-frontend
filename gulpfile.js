const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
// const svgSprite = require("gulp-svg-sprites");

var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var mqpacker = require('css-mqpacker');
var postcssImport  = require("postcss-import");

gulp.task('serve', ['css', 'image'], function() {

  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch("./css/postcss/*.pcss", ['css']);
  gulp.watch("./css/postcss/**/*.pcss", ['css']);
  gulp.watch("./js/*.js").on('change', browserSync.reload);
  gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('css', function () {
  return gulp.src('./css/postcss/main.pcss')
    .pipe(postcss([
      postcssImport(),
      precss,
      autoprefixer({browsers: ['last 2 versions']}),
      mqpacker
    ]))
    .pipe(rename({
      extname: ".css"
    }))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

gulp.task('image', function () {
  gulp.src('./fixtures/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./images'));
});

// gulp.task('sprites', function () {
//   return gulp.src('fixtures/svg/*.svg')
//     .pipe(svgSprite())
//     .pipe(gulp.dest("images"));
// });

gulp.task('default', ['serve']);
