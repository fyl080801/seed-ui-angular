define([
    'angular-ui-router'
], function () {
    'use strict';

    return angular
        .module('app.routes', ['ui.router'])
        .config([
            '$urlRouterProvider',
            '$stateProvider',
            function ($urlRouterProvider, $stateProvider) {

            }
        ]);
});