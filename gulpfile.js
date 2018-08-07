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
  pump = require('pump'),
  rimraf = require('rimraf'),
  concat = require('gulp-concat'),
  cssmin = require('gulp-cssmin'),
  uglify = require('gulp-uglify'),
  ngmin = require('gulp-ngmin'),
  minimist = require('minimist'),
  amdOptimize = require('amd-optimize'),
  webserver = require('gulp-webserver'),
  rev = require('gulp-rev'),
  revCollector = require('sog-gulp-rev-collector'),
  fs = require('fs');

/**
 * 打包require
 */
gulp.task('pack_require', function() {
  gulp
    .src(['bower_components/requirejs/require.js'])
    .pipe(concat('require.js'))
    .pipe(gulp.dest(jsTarget))
    .pipe(concat('require.min.js'))
    .pipe(
      uglify({
        outSourceMap: false
      })
    )
    .pipe(gulp.dest(jsTarget));
});

/**
 * 打包兼容性补丁
 */
gulp.task('pack_patch', function() {
  var paths = ['src/app/patch.js'];
  gulp
    .src(paths)
    .pipe(
      amdOptimize('app/patch', {
        configFile: 'config/build.js',
        baseUrl: 'src'
      })
    )
    .pipe(concat('app.patch.js'))
    .pipe(gulp.dest(jsTarget))
    .pipe(concat('app.patch.min.js'))
    .pipe(
      uglify({
        outSourceMap: false
      })
    )
    .pipe(gulp.dest(jsTarget));
});

/**
 * 打包主体框架
 */
gulp.task('pack_application', [], function(cb) {
  pump(
    [
      gulp.src('src/**/*.js'),
      amdOptimize('app/application', {
        configFile: 'config/build.js',
        baseUrl: 'src'
      }),
      concat('app.application.js'),
      gulp.dest(jsTarget),
      concat('app.application.min.js'),
      uglify({
        outSourceMap: false
      }),
      gulp.dest(jsTarget)
    ],
    cb
  );
});

/**
 * 打包静态文件
 */
gulp.task('pack_resources', function() {
  gulp
    .src([
      'src/**/*',
      '!src/*.ts',
      '!src/*.map',
      '!src/modules/**/*.js',
      '!src/modules/**/*.ts',
      '!src/modules/**/*.map',
      '!src/app/**/*.js',
      '!src/app/**/*.ts',
      '!src/app/**/*.map'
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
    gulp.src(lib).pipe(gulp.dest(target));
  }
});

/**
 * 打包模块
 */
gulp.task('pack_modules', function() {
  var exclude = JSON.parse(fs.readFileSync('config/exclude/module.json'));
  var modules = [];
  var moduleConfigs = [];

  fs.readdirSync('src/modules').forEach(function(current) {
    moduleConfigs.push({
      requiresPath: 'modules/' + current + '/requires', // requires文件路径
      modulePath: 'modules/' + current + '/module', // module文件路径
      requiresName: 'requires.' + current, // requires文件编译结果
      moduleName: 'modules.' + current
    });

    modules.push('modules/' + current + '/module');
  });

  moduleConfigs.forEach(function(current) {
    gulp
      .src(['src/**/*.js'])
      .pipe(
        amdOptimize(current.requiresPath, {
          configFile: 'config/build.js',
          baseUrl: 'src',
          exclude: exclude.concat(modules)
        })
      )
      .pipe(concat(current.requiresName + '.js'))
      .pipe(gulp.dest(jsTarget))
      .pipe(concat(current.requiresName + '.min.js'))
      .pipe(
        uglify({
          outSourceMap: false
        })
      )
      .pipe(gulp.dest(jsTarget));
  });

  moduleConfigs.forEach(function(current) {
    gulp
      .src(['src/**/*.js'])
      .pipe(
        amdOptimize(current.modulePath, {
          configFile: 'config/build.js',
          baseUrl: 'src',
          exclude: exclude
        })
      )
      .pipe(concat(current.moduleName + '.js'))
      .pipe(gulp.dest(jsTarget))
      .pipe(concat(current.moduleName + '.min.js'))
      .pipe(
        uglify({
          outSourceMap: false
        })
      )
      .pipe(gulp.dest(jsTarget));
  });
});

gulp.task('pack_rev', function() {
  gulp
    .src(['dist/**/*.html', 'dist/**/*.js', 'dist/startup.js'])
    .pipe(revCollector(['config/rev.json']))
    .pipe(gulp.dest('dist'));
});

/**
 * 执行build
 */
gulp.task('build', [
  'pack_require',
  'pack_patch',
  'pack_application',
  'pack_modules',
  'pack_resources'
]);

/**
 * 启动server
 */
gulp.task('webserver', function() {
  gulp.src('').pipe(
    webserver({
      fallback: 'src/index.html',
      livereload: false,
      port: 8999,
      directoryListing: false,
      open: false
    })
  );
});
