"use strict";
// import  gulp  from 'gulp';
// const {src, dest, watch, parallel, series} = gulp;

// import gulpsass from 'gulp-sass';
// import nodesass from 'node-sass';
// import sass from 'sass';
// import browserSync from 'browser-sync';
// import useref from 'gulp-useref';
// import gulpIf from 'gulp-if';
// import imagemin from 'gulp-imagemin';
// import cssnano from 'gulp-cssnano';
// import uglify from 'gulp-uglify';
// import {deleteAsync} from 'del';
// import runSequence from 'run-sequence'
// import cache from 'gulp-cache'


// Looking for packages into node modules folder
const { src, dest, watch, series } = require('gulp');
let gulp = require('gulp');
let sass = require('gulp-sass')(require('sass'));
let browserSync = require('browser-sync').create();
let useref = require('gulp-useref');
let uglify = require('gulp-uglify');
let gulpIf = require('gulp-if');
let cssnano = require('gulp-cssnano');
let imagemin = require('gulp-imagemin');
let cache = require('gulp-cache');
// let del = require('del');


// let runSequence = require('run-sequence');


// Executing Task using Packages
gulp.task('sass', (cb) =>{
    return src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(dest('app/css'))
    .pipe(browserSync.stream()),
    cb()   
});


// For Watching All the task
gulp.task('watch',   () =>{
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })

    watch('app/scss/**/*.scss', series(['sass']));

    watch('app/*.html').on("change",  browserSync.reload);  
    watch('app/js/**/*.js').on("change",  browserSync.reload);  

    
}); 


// To minify and concatenate js and css files
gulp.task('useref', ()=>{
    return src('app/*.html')
    .pipe(useref())
    // Minify only if it's CSS file
    .pipe(gulpIf('*.css', cssnano()))

    // Minify only if it's a JS file
    .pipe(gulpIf('*.js', uglify()))
    .pipe(dest('dist'))
})


// To Optimizing Images
gulp.task('images', ()=>{
    return src('app/img/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(imagemin())
    .pipe(cache(imagemin({
        interlaced: true
    })))
    .pipe(dest('dist/img'))
});

// To Optimize Fonts
gulp.task('fonts', ()=>{
    return src('app/fonts/**/*')
    .pipe(dest('dist/fonts'))
})


// Cleaning 
// gulp.task('clean', ()=>{
//     return deleteAsync('dist').then(function(cb) {
//       return cache.clearAll(cb);
//     });
//   })
// For Cleaning or deleting extra files
// gulp.task('clean:dist', ()=>{
//     return deleteAsync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
// })


// clear cache
gulp.task('cache:clear', (cb)=>{
    return cache.clearAll(cb);
});


// For Bulding all the task at once
gulp.task('build', (callback)=>{
    runSequence('clean', ['sass', 'useref', 'images', 'fonts'],  callback)
})







