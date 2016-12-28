/// <binding Clean='clean' />
'use strict';

var gulp = require('gulp'),
    rimraf = require('rimraf'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify'),
    ngmin = require('gulp-ngmin'),
    rename = require('gulp-rename'),
    amdOptimize = require('amd-optimize'),
    webserver = require('gulp-webserver');

var webroot = './app';
var bowerroot = './bower_components';
var jstarget = './app/js';
var csstarget = './app/css';
var fontestarget = './app/fonts';
var modulepath = './src/modules/*.js';
var modules = {};

/**
 * 打包require
 */
gulp.task('pack_require', function () {
    gulp.src(bowerroot + '/requirejs/require.js')
        .pipe(concat('require.js'))
        .pipe(uglify({outSourceMap: false}))
        .pipe(gulp.dest(jstarget));
});

/**
 * 打包兼容性补丁
 */
gulp.task('pack_patch', function () {
    var paths = ['./src/common/iepatch.js'];
    gulp.src(paths)
        .pipe(amdOptimize('iepatch', {
            name: 'iepatch',
            configFile: './src/common/iepatch.js',
            baseUrl: './src/common'
        }))
        .pipe(concat('iepatch.js'))
        .pipe(uglify({outSourceMap: false}))
        .pipe(gulp.dest(jstarget));
});

/**
 * 打包引用库
 */
gulp.task('pack_reference', function () {
    var paths = ['./src/common/reference.js'];
    gulp.src(paths)
        .pipe(amdOptimize('reference', {
            name: 'reference',
            configFile: './src/common/reference.js',
            baseUrl: './src/common'
        }))
        .pipe(concat('reference.js'))
        .pipe(uglify({outSourceMap: false}))
        .pipe(gulp.dest(jstarget));
});

/**
 * 打包应用主体
 */
gulp.task('pack_src', function () {
    gulp.src('./src/app/**/*.js')
        .pipe(concat('application.js'))
        .pipe(uglify({outSourceMap: false}))
        .pipe(gulp.dest(jstarget));
});

/**
 * 打包模块
 */
gulp.task('pack_modules', function () {
    for (var module in modules) {
        gulp.src(modules[module])
            .pipe(concat(module + '.js'))
            .pipe(gulp.dest(jstarget));
    }

    gulp.src(modulepath)
        .pipe(concat('modules.js'))
        .pipe(gulp.dest(jstarget));
});

/**
 * 打包bootstrap组件
 */
gulp.task('pack_bootstrap', function () {
    gulp.src(bowerroot + '/bootstrap/dist/css/bootstrap.min.css')
        .pipe(gulp.dest(csstarget));
    gulp.src(bowerroot + '/bootstrap/dist/css/bootstrap.min.css.map')
        .pipe(gulp.dest(csstarget));
    gulp.src(bowerroot + '/bootstrap/dist/fonts/*')
        .pipe(gulp.dest(fontestarget));
});

gulp.task('build', function () {
    gulp.run('pack_bootstrap');
    gulp.run('pack_require');
    gulp.run('pack_reference');
    gulp.run('pack_patch');
    gulp.run('pack_src');
    gulp.run('pack_modules');
});

gulp.task('webserver', function () {
    gulp.src(webroot)
        .pipe(webserver({
            fallback: '/',
            livereload: false,
            port: 7999,
            directoryListing: false,
            open: true
        }));
});

gulp.task('watch', function () {
    gulp.watch('doc/*.md', function () {
        gulp.run('md');
    });
});

gulp.task('default', function () {
    gulp.run('build');
    gulp.run('webserver');
    gulp.run('watch');
});