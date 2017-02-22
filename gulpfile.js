/// <binding Clean='clean' />
'use strict';

var appRoot = './app';
var bowerRoot = './bower_components';
var jsTarget = './app/js';
var cssTarget = './app/css';
var fontTarget = './app/fonts';
var imgTarget = './app/img';
var modulePath = './src/modules';
var libraryPath = './src/common/libraries.json';

var gulp = require('gulp'),
    rimraf = require('rimraf'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify'),
    ngmin = require('gulp-ngmin'),
    rename = require('gulp-rename'),
    amdOptimize = require('amd-optimize'),
    webserver = require('gulp-webserver'),
    fs = require('fs');

/**
 * 打包require
 */
gulp.task('pack_require', function () {
    gulp.src(bowerRoot + '/requirejs/require.js')
        .pipe(concat('require.js'))
        .pipe(gulp.dest(jsTarget))
        .pipe(concat('require.min.js'))
        .pipe(uglify({outSourceMap: false}))
        .pipe(gulp.dest(jsTarget));
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
        .pipe(gulp.dest(jsTarget))
        .pipe(concat('iepatch.min.js'))
        .pipe(uglify({outSourceMap: false}))
        .pipe(gulp.dest(jsTarget));
});

/**
 * 打包主体库
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
        .pipe(gulp.dest(jsTarget))
        .pipe(concat('reference.min.js'))
        .pipe(uglify({outSourceMap: false}))
        .pipe(gulp.dest(jsTarget));
});

/**
 * 打包引用库
 */
gulp.task('pack_libraries', function () {
    var libraries = JSON.parse(fs.readFileSync(libraryPath));
    if (libraries.bowers) {
        for (var index in libraries.bowers) {
            var lib = libraries.bowers[index];
            doTarget(lib.js, bowerRoot, jsTarget);
            doTarget(lib.css, bowerRoot, cssTarget);
            doTarget(lib.fonts, bowerRoot, fontTarget);
            doTarget(lib.img, bowerRoot, imgTarget);
        }
    }
    if (libraries.paths) {
        for (var index in libraries.paths) {
            var lib = libraries.paths[index];
            doTarget(lib.js, '', jsTarget);
            doTarget(lib.css, '', cssTarget);
            doTarget(lib.fonts, '', fontTarget);
            doTarget(lib.img, '', imgTarget);
        }
    }

    function doTarget(lib, root, target) {
        if (!lib) return;
        var libArray = [];
        if (Object.prototype.toString.call(lib) === '[object Array]') {
            for (var i in lib) {
                libArray.push(root + lib[i]);
            }
        } else {
            libArray.push(root + lib);
        }
        gulp.src(libArray)
            .pipe(gulp.dest(target));
    }
});

/**
 * 打包应用框架
 */
gulp.task('pack_src', function () {
    gulp.src('./src/app/**/*.js')
        .pipe(concat('app.application.js'))
        .pipe(gulp.dest(jsTarget))
        .pipe(concat('app.application.min.js'))
        .pipe(uglify({outSourceMap: false}))
        .pipe(gulp.dest(jsTarget));
});

/**
 * 打包模块
 */
gulp.task('pack_modules', function () {
    var modules = fs.readdirSync(modulePath);
    for (var module in modules) {
        gulp.src([
            './src/modules/' + modules[module] + '/**/*.js',
            '!./src/modules/**/module.js',
            '!./src/modules/**/configs.js',
            '!./src/modules/**/configs/**/*.js'
        ])
            .pipe(concat('module.' + modules[module] + '.js'))
            .pipe(gulp.dest(jsTarget))
            .pipe(concat('module.' + modules[module] + '.min.js'))
            .pipe(uglify({outSourceMap: false}))
            .pipe(gulp.dest(jsTarget));
    }

    gulp.src([
        './src/modules/**/module.js',
        './src/modules/**/configs.js',
        './src/modules/**/configs/**/*.js'
    ])
        .pipe(concat('modules.js'))
        .pipe(gulp.dest(jsTarget))
        .pipe(concat('modules.min.js'))
        .pipe(uglify({outSourceMap: false}))
        .pipe(gulp.dest(jsTarget));
});

gulp.task('build', function () {
    gulp.run('pack_require');
    gulp.run('pack_libraries');
    gulp.run('pack_patch');
    gulp.run('pack_reference');
    gulp.run('pack_src');
    gulp.run('pack_modules');
});

gulp.task('webserver', function () {
    gulp.src(appRoot)
        .pipe(webserver({
            fallback: '/',
            livereload: false,
            port: 7999,
            directoryListing: false,
            open: false
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