/**
 * Created by fyl08 on 2017/2/15.
 */
define('modules.system.configs.router', [
    'modules.system.configs'
], function (configs) {
    'use strict';

    configs.config([
        '$urlRouterProvider',
        '$stateProvider',
        function ($urlRouterProvider, $stateProvider) {
            $urlRouterProvider.otherwise('/session');

            $stateProvider.state('session', {
                url: '/session',
                templateUrl: 'views/system/Session.html',
                dependencies: ['modules.system.requires']
            });

            $stateProvider.state('login', {
                url: '/login',
                templateUrl: 'views/system/Login.html',
                dependencies: ['modules.system.requires'],
                data: {
                    title: '登录'
                }
            });

            $stateProvider.state('main', {
                url: '/main',
                templateUrl: 'views/system/Main.html',
                dependencies: ['modules.system.requires'],
                data: {
                    title: '管理系统'
                }
            });
        }
    ]);
});