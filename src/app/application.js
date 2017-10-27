define([
    'angular',
    'jquery',
    'bootstrap',
    'ui-bootstrap-tpls',
    'app/factories/httpState',
    'app/factories/httpDataHandler',
    'app/configs/appConfig',
    'app/configs/dependencyLoader',
    'app/configs/appEnvironment',
    'app/configs/rootScope',
    'app/configs/modal',
    'app/configs/http',
    'app/services/ajaxService',
    'app/services/httpService',
    'app/services/popupService',
    'app/directives/title',
    'app/directives/theme',
    'app/directives/equals',
    'app/routes/run'
], function () {
    'use strict';

    var moduleFn = angular.module;
    angular.module = function (name, requires, configFn) {
        var angularApp = moduleFn(name, requires, configFn);
        angularApp.config([
            '$controllerProvider',
            '$compileProvider',
            '$filterProvider',
            '$provide',
            function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
                angularApp.controller = $controllerProvider.register;
                angularApp.directive = $compileProvider.directive;
                angularApp.filter = $filterProvider.register;
                angularApp.factory = $provide.factory;
                angularApp.service = $provide.service;
            }
        ]);
        return angularApp;
    };

    return angular.module('app.application', [
        'ui.bootstrap',
        'app.configs',
        'app.factories',
        'app.services',
        'app.routes',
        'app.directives'
    ]);
});