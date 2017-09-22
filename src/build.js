var bowerroot = '../bower_components';

require.config({
    paths: {
        'angular': bowerroot + '/angular/angular.min',
        'jquery': bowerroot + '/jquery/dist/jquery.min',
        'bootstrap': bowerroot + '/bootstrap/dist/js/bootstrap.min',
        'ui-bootstrap-tpls': bowerroot + '/angular-bootstrap/ui-bootstrap-tpls.min',
        'angular-ui-router': bowerroot + '/angular-ui-router/release/angular-ui-router.min',
        'app/application': 'app/application'
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
    },
    exclude: [
        'angular',
        'jquery',
        'bootstrap',
        'angular-ui-router',
        'ui-bootstrap-tpls'
    ]
});

define([
    'require',
    'angular',
    'jquery',
    'bootstrap',
    'ui-bootstrap-tpls',
    'angular-ui-router'
], function (require) {
    'use strict';
});