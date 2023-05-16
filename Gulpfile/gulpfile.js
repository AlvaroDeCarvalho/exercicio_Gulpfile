const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const sourcemaps= require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');


function compressImg(){
   return gulp.src('./source/imagens/*')
   .pipe(imagemin())
   .pipe(gulp.dest('./build/imagens'))

}


function compressJS(){
    return gulp.src("./source/scripts/*.js")
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest("./build/scripts"))
}



function compilaSaas(){

    return gulp.src('./source/styles/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle:'compressed'
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./build/styles'))
}

exports.default = function(){
    gulp.watch('./source/styles/*.scss',{ignoreInitial: false}, gulp.series(compilaSaas))
    gulp.watch('./source/scripts/*.js',{ignoreInitial: false}, gulp.series(compressJS))
    gulp.watch('./source/imagens/*',{ignoreInitial: false}, gulp.series(compressImg))

}
