const { src, dest, lastRun, watch, series, parallel } = require("gulp"),
      gulpInc = require("gulp-file-include"),
      merge = require('merge-stream'),            // 여러 스트림 병합
      concat = require("gulp-concat"),                  // 파일 병합
      imgmin = require("gulp-imagemin"),                // 이미지압축
      sass = require('gulp-sass')(require('sass')),     // scss 컴파일
      newer = require("gulp-newer"),                    // dist 폴더의 결과물보다 최신의 timestamp를 가진 경우만 실행
      del = require('del'),
      bs = require("browser-sync").create(); 

function inc(){
  return src('src/html/*/*.html')
  .pipe(gulpInc({
    prefix : '@@',
    basepath : '@file'
  }))
  .pipe(dest('src/dist/'))
  .pipe(bs.stream());
}
function scss(){
  return merge(
    src(['src/scss/*.scss'], {sourcemaps: true })
    .pipe(concat('merge.css'))
    .pipe(sass(scssOptions).on('error', sass.logError))
    .pipe(dest('src/css',{ sourcemaps: true }))
    .pipe(bs.stream())
  )
}
// scss options
var scssOptions = {
  outputStyle : "compressed",// nested, expanded, compact, compressed
  indentType : "tab",// 들여쓰기 space, tab
  indentWidth : 1,// 들여쓰기 갯수 / default: 2  
  sourceComments: false // 컴파일 된 css에 원본 소스이 위치와 줄 수 주석 표시
}
function js(){
  return src('src/js/*.js')
  .pipe(bs.stream());
}
function watchs(){
  bs.init({
  server :{
    baseDir : 'src/'
  }});
  watch('src/html/**/*.html', inc);
  watch('src/scss/**/*.scss', scss);
  watch('src/js/**/*.js', js);
}

exports.inc = inc;
exports.scss = scss;
exports.watch = watchs;
exports.default = watchs;