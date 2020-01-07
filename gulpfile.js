const gulp = require("gulp");
const browsersync = require("browser-sync").create();
const imagemin = require("gulp-imagemin");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const rename = require('gulp-rename');
const precss = require('precss');
const mqpacker = require('css-mqpacker');
const postcssImport  = require("postcss-import");

let imagesSrc = './fixtures/images/*';
let imagesDest = './images';

// BrowserSync
function browserSync(done) {
  browsersync.init({
      server: {
          baseDir: "./"
      },
      port: 3000
  });
  done();
}


// Optimize Images
function images() {
  return gulp
    .src(imagesSrc)
    .pipe(newer(imagesDest))
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            {
              removeViewBox: false,
              collapseGroups: true
            }
          ]
        })
      ])
    )
    .pipe(gulp.dest(imagesDest));
}

// CSS task
function css() {
  return gulp
    .src("./css/postcss/main.pcss")
    .pipe(postcss([
      postcssImport(),
      precss,
      autoprefixer,
      mqpacker
    ]))
    .pipe(rename({
      extname: ".css"
    }))
    .pipe(gulp.dest("./css"))
    .pipe(browsersync.stream());
}

// HTML task
function html() {
  return gulp
      .src("./*.html")
      .pipe(browsersync.stream());
}

// JS task
function js() {
  return gulp
    .src("./js/*.js")
    .pipe(browsersync.stream());
}

// Watch files
function watchFiles() {
  gulp.watch("./*.html", html);
  gulp.watch("./css/postcss/*.pcss", css);
  gulp.watch("./css/postcss/**/*.pcss", css);
  gulp.watch("./js/*.js", js);

  gulp.watch(imagesSrc, images);
}

const serve = gulp.parallel(watchFiles, browserSync);

exports.default = serve;


// const svgSprite = require("gulp-svg-sprites");
// gulp.task('sprites', function () {
//   return gulp.src('fixtures/svg/*.svg')
//     .pipe(svgSprite())
//     .pipe(gulp.dest("images"));
// });