/**
 * Created by fyl08 on 2016/12/23.
 */
define('app.routes', [
    'require',
    'angular-ui-router'
], function (require) {
    'use strict';

    return angular.module('app.routes', ['ui.router'])
        .config(
            [
                '$urlRouterProvider',
                '$stateProvider',
                function ($urlRouterProvider, $stateProvider) {

                }
            ]
        )
        .run(
            [
                '$rootScope',
                '$state',
                '$stateParams',
                function ($rootScope, $state, $stateParams) {
                    $rootScope.$state = $state;
                    $rootScope.$stateParams = $stateParams;
                    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

                    });
                    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                        $rootScope.previousName = fromState.name;
                        $rootScope.previousParams = fromParams;
                    });
                    $state.back = function () {
                        if ($rootScope.previousName)
                            $state.go($rootScope.previousName, $rootScope.previousParams);
                    };
                }
            ]
        );
});