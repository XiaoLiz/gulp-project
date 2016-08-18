var gulp = require('gulp');      //本地安装gulp所用的npm 依赖包
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');  
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require("gulp-autoprefixer");
var imagemin = require('gulp-imagemin');
var connect = require('gulp-connect');
var gulpif = require('gulp-if');
var useref = require('gulp-useref');

var del = require('del');
var path = require('path');
var supportedBrowsers = [
    'last 2 versions',
    'safari 5',
    'ie 9',
    'opera 12.1',
    'ios 6',
    'android 4'
];

//useref
gulp.task('html', function () {
    return gulp.src('./scr/*.html')
        .pipe(useref())
        .pipe(gulp.dest('./src/build/script'));
});


//Less
gulp.task('less', function() {
   return gulp.src('./src/styles/base.less')
        .pipe(sourcemaps.init())
        .pipe(less({
        	dumpLineNumbers: 'comments',
            paths: [ path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(autoprefixer({ browsers: supportedBrowsers }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./src/build/styles'))
});


//Script
gulp.task('script', function() {
   return gulp.src(['./src/script/*.js', './src/script/local_lib/*.js'])
		.pipe(gulpif(['*.js','!*.min.js'], uglify()))
        .pipe(gulp.dest('./src/build/script'))
})


//Images
gulp.task('images', function () {
   return gulp.src('./src/images/*.*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('./src/images'))
});


//监听文件修改
gulp.task('watch', function () {
	gulp.watch('./src/styles/*.*', ['less'])
    gulp.watch(['./src/script/*.js', './src/script/local_lib/*.js'], ['script'])
    gulp.watch('./src/images/*.*', ['images'])    
});



http 服务
gulp.task('connect', function () {
    connect.server({
        root: ['src'],
        port: 9080,
        livereload: false
    });
});


// 清除垃圾数据
gulp.task('cleanAll', function (callback) {
    del(['./src/build'], callback);
});


// 开发
gulp.task('develop', ['cleanAll', 'watch', 'less','images','script']);



gulp.task("default",['develop']);














