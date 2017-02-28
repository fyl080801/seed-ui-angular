/**
 * Created by fyl08 on 2017/1/4.
 */
define('modules.system.controllers.session', [
    'modules.system.module'
], function (module) {
    'use strict';

    module.controller('modules.system.controllers.session', [
        '$scope',
        '$state',
        'modules.system.services.sessionService',
        function ($scope, $state, sessionService) {
            sessionService
                .checkSession()
                .authenticated(function (session) {
                    $state.go('main');
                })
                .unAuthenticated(function () {
                    $state.go('login');
                });
        }
    ]);
});