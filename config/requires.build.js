require.config({
  removeCombined: true,
  fileExclusionRegExp: /^\./,
  paths: {
    angular: '../bower_components/angular/angular.min',
    jquery: '../bower_components/jquery/dist/jquery.min',
    bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min',
    'ui-bootstrap-tpls':
      '../bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
    'angular-ui-router':
      '../bower_components/angular-ui-router/release/angular-ui-router.min',
    'app/application': 'app/application'
  },
  exclude: [
    'app/application',
    'modules/sample/module',
    'modules/ngtable/module'
  ]
});
