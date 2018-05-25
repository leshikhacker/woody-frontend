const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const svgSprite = require("gulp-svg-sprites");

gulp.task('serve', ['image'], function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch("./js/*.js").on('change', browserSync.reload);
  gulp.watch("./css/*.css").on('change', browserSync.reload);
  gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('image', ['sprites'], function () {
  gulp.src('./fixtures/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./images'));
});

gulp.task('sprites', function () {
  return gulp.src('fixtures/svg/*.svg')
    .pipe(svgSprite())
    .pipe(gulp.dest("images"));
});

gulp.task('default', ['serve']);
