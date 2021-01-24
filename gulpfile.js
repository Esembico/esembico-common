const { src, dest, watch, series } = require('gulp');
const babel = require('gulp-babel');
const del = require('del');

const globsJs = ['src/**/*.js', '!src/**/*.test.js'];
const globsCss = ['src/**/*.css'];

const clean = (cb) => {
  del(['dist']).finally(cb);
};

const buildJs = (cb) => {
  src(globsJs)
    .pipe(
      babel({
        presets: ['@babel/preset-env']
      })
    )
    .pipe(dest('dist/js'));
  cb();
};

const buildStyles = (cb) => {
  src(globsCss).pipe(dest('dist/styles'));
  cb();
};

const build = (cb) => {
  series(clean, buildJs, buildStyles)();
  cb();
};

const watchTask = (cb) => {
  watch('src/**', series(clean, buildJs, buildStyles));
  cb();
};

exports.watch = watchTask;
exports.build = build;
