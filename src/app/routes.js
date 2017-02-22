/**
 * Created by fyl08 on 2016/12/23.
 */
define('app.routes', [
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