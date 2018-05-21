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
    angular: '../bower_components/angular/angular',
    jquery: '../bower_components/jquery/dist/jquery.min',
    bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min',
    'ui-bootstrap-tpls':
      '../bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
    'angular-ui-router':
      '../bower_components/angular-ui-router/release/angular-ui-router.min',
    'angular-sanitize':
      '../bower_components/angular-sanitize/angular-sanitize.min',
    'angular-cookies': '../bower_components/angular-cookies/angular-cookies.min'
  },
  exclude: []
});
