const { src, dest, series, watch } = require("gulp");
const sourcemaps = require('gulp-sourcemaps')
const csso = require('gulp-csso')
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const server = require('browser-sync');
const gulpAvif = require('gulp-avif')
const gulpWebp = require('gulp-webp')
const imagemin = require('gulp-imagemin')

function html () {
  return src('src/*.html')
    .pipe(dest('dist'))
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

function serve () {
  server.init({
    server: 'src/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  })
  watch('src/scss/**/*.scss', series(css, cssNomin, refresh))
  watch('src/*.html', series(html, refresh))
}

function refresh (done) {
  server.reload()
  done()
}

function toAvif () {
  return src('src/img/*.{png,jpg}')
    .pipe(gulpAvif({quality: 70, speed: 5}))
    .pipe(dest('dist/img/'));
}

function toWebp () {
  return src('src/img/*.{png,jpg}')
    .pipe(gulpWebp({quality: 70}))
    .pipe(dest('dist/img/'));
}

function image () {
  return src('src/img/*.{png,jpg}')
  .pipe(imagemin([
    gifsicle({interlaced: true}),
    mozjpeg({quality: 75, progressive: true}),
    optipng({optimizationLevel: 5}),
  ]))
  .pipe(dest('dist/img/'));
}

exports.html = html
exports.css = css
exports['css-nomin'] = cssNomin
exports['to-avif'] = toAvif
exports['to-webp'] = toWebp
exports.image = image
exports.serve = serve