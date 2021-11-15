const { src, dest, series, watch } = require("gulp");
const fileInclude = require('gulp-file-include')
const sourcemaps = require('gulp-sourcemaps')
const csso = require('gulp-csso')
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const server = require('browser-sync');
const gulpAvif = require('gulp-avif')
const gulpWebp = require('gulp-webp')
const imagemin = require('gulp-imagemin')
const mozjpeg = require('imagemin-mozjpeg')
const optipng = require('imagemin-optipng')
const svgo = require('gulp-svgo')
const svgstore = require('gulp-svgstore')
const pipeline = require('readable-stream').pipeline
const uglify = require('gulp-uglify-es').default
const del = require('del');
const avif = require("gulp-avif");

function html () {
  return src('src/*.html')
    .pipe(dest('dist'))
}

function htmlInclude () {
  return src(['./src/*.html'])
  .pipe(fileInclude({
    prefix: '@',
    basepath: '@file'
  }))
  .pipe(dest('./dist'))
  .pipe(server.stream());
}

function css () {
  return src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(dest('dist/css'))
}

function cssNomin () {
  return src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(dest('dist/css'))
}

function refresh (done) {
  server.reload()
  done()
}

function toAvif () {
  return src('src/img/*.{png,jpg}')
    .pipe(gulpAvif({quality: 70, speed: 6}))
    .pipe(dest('dist/img/'));
}

function toWebp () {
  return src('src/img/*.{png,jpg}')
    .pipe(gulpWebp({quality: 80}))
    .pipe(dest('dist/img/'));
}

function compressImages () {
  return src('src/img/*.{png,jpg}')
    .pipe(imagemin([
      mozjpeg({quality: 75, progressive: true}),
      optipng({optimizationLevel: 3}),
    ]))
    .pipe(dest('dist/img/'));
}

function sprite () {
  return src('src/img/**/icon-*.svg')
    .pipe(imagemin([
      svgo({optimizationLevel: 3})
    ]))
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(dest('dist/img/'))
}

function js () {
  return pipeline(
    src('src/js/*.js'),
    sourcemaps.init(),
    uglify(),
    sourcemaps.write('.'),
    rename({suffix: '.min'}),
    dest('dist/')
  )
}

function copy () {
  return src([
    'src/fonts/**/*',
    'src/*.ico*'
  ], {
    base: 'src'
  })
  .pipe(dest('dist'))
}

function clean () {
  return del('dist')
}

function serve () {
  server.init({
    server: 'dist/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  })
  watch('src/scss/**/*.scss', series(css, cssNomin, refresh))
  watch('src/*.html', series(html, refresh))
}

exports.html = html
exports['html-include'] = htmlInclude
exports.css = css
exports['css-nomin'] = cssNomin
exports.images = series (
  toAvif,
  toWebp,
  compressImages
)
exports.sprite = sprite
exports.js = js
exports.clean = clean
exports.copy = copy
exports.serve = serve

exports.start = series (
  clean,
  toAvif,
  toWebp,
  compressImages,
  copy,
  html,
  htmlInclude,
  css,
  cssNomin,
  sprite,
  js,
  serve
)