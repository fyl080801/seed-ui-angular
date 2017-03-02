/**
 * Created by fyl08 on 2017/1/4.
 */
define('modules.user.module', [
    'app.application',
    'modules.system.module'
], function (application) {
    'use strict';

    application.requires.push('modules.user');

    return angular
        .module('modules.user', ['ui.router', 'modules.system'])
        .config([
            '$urlRouterProvider',
            '$stateProvider',
            function ($urlRouterProvider, $stateProvider) {
                $stateProvider.state('main.user', {
                    text: '用户管理',
                    url: '/user',
                    templateUrl: 'views/user/List.html',
                    css: ['./css/bootstrap-table.min.css'],
                    dependencies: ['modules.controls.requires', 'modules.user.requires']
                });
            }
        ])
        .config([
            'modules.system.configs.linkManagerProvider',
            function (linkManagerProvider) {
                linkManagerProvider
                    .get('system')
                    .add({
                        id: 'system.user',
                        text: '用户管理',
                        href: '#/main/user',
                        authorize: '/User/List',
                        order: 1
                    });
            }
        ]);
});