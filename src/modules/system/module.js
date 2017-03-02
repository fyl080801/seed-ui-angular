/**
 * Created by fyl08 on 2017/1/4.
 */
define('modules.system.module', [
    'app.application',
    'modules.system.configs.appStates',
    'modules.system.configs.state',
    'modules.system.configs.router',
    'modules.system.configs.linkManager'
], function (application) {
    'use strict';

    application.requires.push('modules.system');

    return angular
        .module('modules.system', ['ui.router', 'modules.system.configs'])
        .config([
            'modules.system.configs.linkManagerProvider',
            function (linkManagerProvider) {
                linkManagerProvider
                    .add({
                        id: 'system',
                        text: '系统管理',
                        icon: 'glyphicon glyphicon-cog'
                    });
            }
        ])
        .run([
            '$rootScope',
            '$appStates',
            function ($rootScope, $appStates) {
                $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                    $rootScope.navigation = [];
                    findState($appStates, toState.url, $rootScope.navigation);
                    $rootScope.navigation.push({
                        text: toState.text
                    });
                });

                function findState(states, find, result) {
                    $.each(states, function (index, item) {
                        if (find.indexOf(item.url) === 0 && find !== item.url) {
                            result.push({
                                url: item.url,
                                text: item.text
                            });
                            findState(states, item.url, result);
                        }
                    })
                }
            }
        ]);
});