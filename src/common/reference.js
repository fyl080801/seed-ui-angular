/**
 * Created by fyl08 on 2016/12/23.
 */
var bowerroot = '../../bower_components';

require.config({
    paths: {
        'angular': bowerroot + '/angular/angular.min',
        'jquery': bowerroot + '/jquery/dist/jquery.min',
        'bootstrap': bowerroot + '/bootstrap/dist/js/bootstrap.min',
        'ui-bootstrap-tpls': bowerroot + '/angular-bootstrap/ui-bootstrap-tpls.min',
        'angular-ui-router': bowerroot + '/angular-ui-router/release/angular-ui-router.min',
        'angular-css': bowerroot + '/angular-css/angular-css.min'
    },
    shim: {
        'angular': {exports: 'angular'},
        'bootstrap': {deps: ['jquery']},
        'ui-bootstrap-tpls': {deps: ['angular', 'bootstrap']},
        'angular-ui-router': {deps: ['angular']},
        'angular-css': {deps: ['angular']}
    }
});

define([
    'require',
    'angular',
    'jquery',
    'bootstrap',
    'ui-bootstrap-tpls',
    'angular-ui-router',
    'angular-css'
], function (require) {
    'use strict';
});