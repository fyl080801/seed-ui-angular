require.config({
    paths: {
        'rcss': '../bower_components/require-css/css.min',
        'angular': '../bower_components/angular/angular.min',
        'jquery': '../bower_components/jquery/dist/jquery.min',
        'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
        'ui-bootstrap-tpls': '../bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
        'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router.min'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'ui-bootstrap-tpls': {
            deps: ['angular', 'bootstrap']
        },
        'angular-ui-router': {
            deps: ['angular']
        }
    }
});

define([
    'rcss',
    'angular',
    'jquery',
    'bootstrap',
    'ui-bootstrap-tpls',
    'angular-ui-router'
], function () {
    'use strict';
});