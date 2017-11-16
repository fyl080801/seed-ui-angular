/**
 * 基本路径
 */
var jsTarget = 'dist/js',
    cssTarget = 'dist/css',
    fontTarget = 'dist/fonts',
    imgTarget = 'dist/images';

/**
 * 模块定义
 */
var gulp = require('gulp'),
    rimraf = require('rimraf'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify'),
    ngmin = require('gulp-ngmin'),
    minimist = require('minimist'),
    amdOptimize = require('amd-optimize'),
    webserver = require('gulp-webserver'),
    fs = require('fs');

/**
 * 打包require
 */
gulp.task('pack_require', function () {
    gulp.src('bower_components/requirejs/require.js')
        .pipe(concat('require.js'))
        .pipe(gulp.dest(jsTarget))
        .pipe(concat('require.min.js'))
        .pipe(uglify({
            outSourceMap: false
        }))
        .pipe(gulp.dest(jsTarget));
});

/**
 * 打包兼容性补丁
 */
gulp.task('pack_patch', function () {
    var paths = ['src/patch.js'];
    gulp.src(paths)
        .pipe(amdOptimize('patch', {
            name: 'iepatch',
            configFile: 'config/patch.build.js',
            baseUrl: 'src'
        }))
        .pipe(concat('patch.js'))
        .pipe(gulp.dest(jsTarget))
        .pipe(concat('patch.min.js'))
        .pipe(uglify({
            outSourceMap: false
        }))
        .pipe(gulp.dest(jsTarget));
});

/**
 * 打包主体库
 */
gulp.task('pack_app', function () {
    var paths = ['src/app.js'];
    gulp.src(paths)
        .pipe(amdOptimize('app', {
            name: 'app',
            configFile: 'config/app.build.js',
            baseUrl: 'src'
        }))
        .pipe(concat('app.js'))
        .pipe(gulp.dest(jsTarget))
        .pipe(concat('app.min.js'))
        .pipe(uglify({
            outSourceMap: false
        }))
        .pipe(gulp.dest(jsTarget));
});

/**
 * 打包应用框架
 */
gulp.task('pack_application', function () {
    gulp.src('src/**/*.js')
        .pipe(amdOptimize('app/application', {
            name: 'app/application',
            configFile: 'config/application.build.js',
            baseUrl: 'src'
        }))
        .pipe(concat('app.application.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(concat('app.application.min.js'))
        .pipe(uglify({
            outSourceMap: false
        }))
        .pipe(gulp.dest(jsTarget));
});

/**
 * 打包静态文件
 */
gulp.task('pack_resources', function () {
    gulp.src([
            'resources/**/*',
            'src/**/*',
            '!src/modules/**/*.js',
            '!src/app',
            '!src/**/*.js',
            '!src/index.html',
            '!src/reference.json'
        ])
        .pipe(gulp.dest('dist'));

    var reference = JSON.parse(fs.readFileSync('config/reference.json'));

    for (var name in reference) {
        var ref = reference[name];
        doTarget(ref.js, jsTarget);
        doTarget(ref.css, cssTarget);
        doTarget(ref.fonts, fontTarget);
        doTarget(ref.images, imgTarget);
    }

    function doTarget(lib, target) {
        if (!lib || !target) return;
        gulp.src(lib)
            .pipe(gulp.dest(target));
    }
});

/**
 * 打包模块
 */
gulp.task('pack_modules', function () {
    var modules = fs.readdirSync('src/modules');
    var builds = fs.readdirSync('config')
        .filter(function (file) {
            return file.endsWith('.build.js') &&
                !file.startsWith('requires.') &&
                file !== 'app.build.js' &&
                file !== 'application.build.js' &&
                file !== 'patch.build.js';
        });

    for (var idx in modules) {
        var requiresPath = 'modules/' + modules[idx] + '/requires';
        var requiresName = 'modules.' + modules[idx];

        gulp.src('src/**/*.js')
            .pipe(amdOptimize(requiresPath, {
                configFile: 'config/requires.build.js',
                baseUrl: 'src'
            }))
            .pipe(concat(requiresName + '.js'))
            .pipe(gulp.dest('dist/js'))
            .pipe(concat(requiresName + '.min.js'))
            .pipe(uglify({
                outSourceMap: false
            }))
            .pipe(gulp.dest(jsTarget));
    }

    for (var bidx in builds) {
        var buildFile = builds[bidx];
        var buildName = buildFile.replace('.build.js', '');

        gulp.src('src/**/*.js')
            .pipe(amdOptimize(buildName + '.modules', {
                configFile: 'config/' + buildFile,
                baseUrl: 'src'
            }))
            .pipe(concat(buildName + '.modules.js'))
            .pipe(gulp.dest(jsTarget))
            .pipe(concat(buildName + '.modules.min.js'))
            .pipe(uglify({
                outSourceMap: false
            }))
            .pipe(gulp.dest(jsTarget));
    }
});

/**
 * 执行build
 */
gulp.task('build', ['pack_require', 'pack_patch', 'pack_app', 'pack_application', 'pack_resources', 'pack_modules']);

/**
 * 启动server
 */
gulp.task('start', function () {
    gulp.src('')
        .pipe(webserver({
            fallback: 'src/index.html',
            livereload: false,
            port: 8999,
            directoryListing: false,
            open: false
        }));
});