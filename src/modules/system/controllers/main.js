/**
 * Created by fyl08 on 2017/1/4.
 */
define('modules.system.controllers.main', [
    'modules.system.module',
    'modules.system.links',
    'modules.system.components.sidebar'
], function (module, links) {
    'use strict';

    module.controller('modules.system.controllers.main', [
        '$scope',
        '$rootScope',
        '$state',
        '$appEnvironment',
        'app.services.popupService',
        'modules.system.services.sessionService',
        function ($scope, $rootScope, $state, $appEnvironment, popupService, sessionService) {
            var me = this;

            $scope.$rootScope = $rootScope;

            if (!$appEnvironment.session) {
                sessionService
                    .checkSession()
                    .authenticated(function (session) {
                        me.links = links;
                    })
                    .unAuthenticated(function () {
                        $state.go('login');
                    });
            } else {
                me.links = links;
            }

            me.changePassword = function () {

            };

            me.logout = function () {
                popupService
                    .confirm('是否退出？')
                    .ok(function () {
                        sessionService
                            .logout()
                            .success(function () {
                                $state.go('login');
                            });
                    });
            };
        }
    ]);
});