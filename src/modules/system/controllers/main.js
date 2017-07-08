/**
 * Created by fyl08 on 2017/1/4.
 */
define('modules.system.controllers.main', [
    'modules.system.module',
    'modules.system.components.sidebar'
], function (module) {
    'use strict';

    module.controller('modules.system.controllers.main', [
        '$scope',
        '$rootScope',
        '$state',
        '$appEnvironment',
        '$modal',
        'modules.system.configs.linkManager',
        'app.services.popupService',
        'app.services.httpService',
        'modules.system.services.sessionService',
        function ($scope, $rootScope, $state, $appEnvironment, $modal, linkManager, popupService, httpService, sessionService) {
            var me = this;

            $scope.$rootScope = $rootScope;

            if (!$appEnvironment.session) {
                sessionService
                    .checkSession()
                    .authenticated(function () {
                        me.links = linkManager.tree();
                    })
                    .unAuthenticated(function () {
                        $state.go('login');
                    });
            } else {
                me.links = linkManager.tree();
            }

            me.changePassword = function () {
                $modal
                    .open({
                        templateUrl: 'views/system/UserPassword.html',
                        size: 'sm'
                    }).result
                    .then(function (result) {
                        httpService
                            .post('/Account/ChangePassword', {
                                OldPassword: result.OldPassword,
                                NewPassword: result.NewPassword,
                                ConfirmPassword: result.ConfirmPassword
                            })
                            .then(function () {
                                popupService.infomation();
                            });
                    });
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