/**
 * Created by fyl08 on 2017/3/12.
 */
define('modules.plugin.module', [
    'app.application'
], function (application) {
    'use strict';

    application.requires.push('modules.plugin');

    return angular
        .module('modules.plugin', [
            'ui.router'
        ])
        .config([
            'modules.system.configs.linkManagerProvider',
            function (linkManagerProvider) {
                linkManagerProvider
                    .get('system')
                    .add({
                        id: 'system.plugin',
                        text: '插件管理',
                        href: '#/main/plugin',
                        authorize: '/Plugin/List',
                        order: 10
                    });
            }
        ])
        .config([
            '$stateProvider',
            function ($stateProvider) {
                $stateProvider.state('main.plugin', {
                    url: '/plugin',
                    templateUrl: 'views/plugin/List.html',
                    text: '插件管理',
                    css: ['./css/bootstrap-table.min.css'],
                    dependencies: [
                        'modules.controls.requires',
                        'modules.plugin.requires'
                    ]
                });
            }
        ]);
});