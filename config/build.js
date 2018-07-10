require.config({
  removeCombined: true,
  fileExclusionRegExp: /^\./,
  paths: {
    //
    'es5-shim': '../bower_components/es5-shim/es5-shim.min',
    'es5-sham': '../bower_components/es5-shim/es5-sham.min',
    html5shiv: '../bower_components/html5shiv/dist/html5shiv.min',
    json2: '../bower_components/json2/json2',
    respond: '../bower_components/respond/dest/respond.min',
    //
    rcss: '../bower_components/require-css/css',
    'angular-base': '../bower_components/angular/angular',
    angular: '../src/app/angular',
    jquery: '../bower_components/jquery/dist/jquery.min',
    bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min',
    'angular-ui-bootstrap':
      '../bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
    'angular-ui-router':
      '../bower_components/angular-ui-router/release/angular-ui-router.min',
    'angular-sanitize':
      '../bower_components/angular-sanitize/angular-sanitize.min',
    'angular-cookies':
      '../bower_components/angular-cookies/angular-cookies.min',
    //
    'jquery.jexcel': '../node_modules/jexcel/dist/js/jquery.jexcel',
    three: '../bower_components/three/build/three.min'
    // webuploader: '../bower_components/fex-webuploader/dist/webuploader.min',
    // 'webuploader.withoutimage':
    //   '../bower_components/fex-webuploader/dist/webuploader.withoutimage.min'
  },
  shim: {
    bootstrap: { deps: ['angular'] }
  },
  exclude: []
});
