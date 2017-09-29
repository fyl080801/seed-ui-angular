require.config({
    removeCombined: true,
    fileExclusionRegExp: /^\./,
    paths: {
        'rcss': '../bower_components/require-css/css.min',
        'angular': '../bower_components/angular/angular.min',
        'jquery': '../bower_components/jquery/dist/jquery.min',
        'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
        'ui-bootstrap-tpls': '../bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
        'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router.min'
    }
});