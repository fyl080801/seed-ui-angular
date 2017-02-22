/**
 * Created by fyl08 on 2016/12/22.
 */
define('app.application', [
    'angular',
    'jquery',
    'bootstrap',
    'ui-bootstrap-tpls',
    'angular-css',
    'app.configs.appConfig',
    'app.configs.dependencyLoader',
    'app.configs.appEnvironment',
    'app.configs.rootScope',
    'app.configs.modal',
    'app.configs.http',
    'app.factories.httpState',
    'app.factories.httpDataHandler',
    'app.services.ajaxService',
    'app.services.httpService',
    'app.services.popupService',
    'app.routes.run',
    'app.directives.title'
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
        'angularCSS',
        'app.configs',
        'app.factories',
        'app.services',
        'app.routes',
        'app.directives'
    ]);
});