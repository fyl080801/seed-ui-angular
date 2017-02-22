/**
 * Created by fyl08 on 2017/1/17.
 */
define('modules.resource', [
    'app.application'
], function (application) {
    'use strict';

    application.requires.push('modules.resource');

    return angular.module('modules.resource', ['ui.bootstrap'])
        .config([
            '$urlRouterProvider',
            '$stateProvider',
            function ($urlRouterProvider, $stateProvider) {
                $stateProvider.state('main.resource', {
                    text: '素材管理',
                    url: '/resource',
                    templateUrl: 'views/resource/List.html',
                    css: ['./css/bootstrap-table.min.css'],
                    dependencies: ['modules.controls.requires', 'modules.resource.requires']
                });
            }
        ]);
});