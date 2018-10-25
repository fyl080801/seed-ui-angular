require.config({
  removeCombined: true,
  fileExclusionRegExp: /^\./,
  paths: {
    //
    'es5-shim': '../node_modules/es5-shim/es5-shim.min',
    'es5-sham': '../node_modules/es5-shim/es5-sham.min',
    html5shiv: '../node_modules/html5shiv/dist/html5shiv.min',
    json2: '../node_modules/JSON/json2',
    respond: '../node_modules/respond.js/dest/respond.min',
    //
    rcss: '../node_modules/require-css/css',
    'angular-base': '../node_modules/angular/angular',
    angular: '../src/app/angular',
    jquery: '../node_modules/jquery/dist/jquery.min',
    bootstrap: '../node_modules/bootstrap/dist/js/bootstrap.min',
    'angular-ui-bootstrap':
      '../node_modules/angular-bootstrap/ui-bootstrap-tpls.min',
    'angular-ui-router':
      '../node_modules/angular-ui-router/release/angular-ui-router.min',
    'angular-sanitize': '../node_modules/angular-sanitize/angular-sanitize.min',
    'angular-cookies': '../node_modules/angular-cookies/angular-cookies.min',
    //
    'jquery.jexcel': '../node_modules/jexcel/dist/js/jquery.jexcel',
    three: '../node_modules/three/build/three.min'
    // webuploader: '../node_modules/fex-webuploader/dist/webuploader.min',
    // 'webuploader.withoutimage':
    //   '../node_modules/fex-webuploader/dist/webuploader.withoutimage.min'
  },
  shim: {
    bootstrap: { deps: ['jquery'] },
    'jquery.jexcel': { deps: ['jquery'] }
  },
  exclude: []
});
