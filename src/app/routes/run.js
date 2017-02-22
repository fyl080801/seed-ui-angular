/**
 * Created by fyl08 on 2017/2/22.
 */
define('app.routes.run', [
    'app.routes'
], function (routes) {
    'use strict';

    routes.run([
        '$rootScope',
        '$state',
        '$stateParams',
        function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

            });
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                $rootScope.$previous = fromState;
                $rootScope.$previousParams = fromParams;
            });
            $state.back = function () {
                if ($rootScope.$previous)
                    $state.go($rootScope.$previous.name, $rootScope.$previousParams);
            };
        }
    ]);
});