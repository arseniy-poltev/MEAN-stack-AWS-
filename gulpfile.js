const gulp = require('gulp');
const ts = require('gulp-typescript');
var clean = require('gulp-clean');
var run = require('gulp-run');
const CONFIG_FILES = ['package.json','src/config.json']
const tsProject = ts.createProject('tsconfig.json');
const destPath = 'dist';
gulp.task('scripts', () => {
  const tsResult = tsProject.src()
  .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest(destPath));
});
gulp.task('clean',()=>{
  return gulp.src(destPath)
  .pipe(clean());
});
gulp.task('assets', function() {
  return gulp.src(CONFIG_FILES)
  .pipe(gulp.dest(destPath));
});
gulp.task('bundle',['assets','scripts'],()=>{});
gulp.task('serve',['bundle'],() =>{
  run(`node ${destPath}/server.js`).exec();
});
