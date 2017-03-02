/**
 * Created by fyl08 on 2017/1/16.
 */
define('modules.role.module', [
    'app.application',
    'modules.system.module'
], function (application) {
    'use strict';

    application.requires.push('modules.role');

    return angular
        .module('modules.role', ['ui.router', 'modules.system'])
        .config([
            '$urlRouterProvider',
            '$stateProvider',
            function ($urlRouterProvider, $stateProvider) {
                $stateProvider.state('main.role', {
                    text: '角色管理',
                    url: '/role',
                    templateUrl: 'views/role/List.html',
                    css: ['./css/bootstrap-table.min.css'],
                    dependencies: ['modules.controls.requires', 'modules.role.requires']
                });
            }
        ])
        .config([
            'modules.system.configs.linkManagerProvider',
            function (linkManagerProvider) {
                linkManagerProvider
                    .get('system')
                    .add({
                        id: 'system.role',
                        text: '角色管理',
                        href: '#/main/role',
                        authorize: '/Role/Roles',
                        order: 0
                    });
            }
        ]);
});