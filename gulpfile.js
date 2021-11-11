const { src, dest, series, watch } = require("gulp");
const sourcemaps = require('gulp-sourcemaps')
const csso = require('gulp-csso')
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const server = require('browser-sync');

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

exports.html = html
exports.css = css
exports['css-nomin'] = cssNomin
exports.serve = serve