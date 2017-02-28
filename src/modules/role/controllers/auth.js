/**
 * Created by fyl08 on 2017/2/28.
 */
define('modules.role.controllers.auth', [
    'modules.role.module'
], function (module) {
    'use strict';

    module.controller('modules.role.controllers.auth', [
        '$scope',
        '$modal',
        'modules.role.services.authService',
        function ($scope, $modal, authService) {
            var me = this;

            this.list = [];

            this.edit = function (data) {
                $modal
                    .open({
                        templateUrl: 'views/role/AuthEdit.html',
                        data: data
                    }).result
                    .then(function (data) {
                        authService
                            .save(data)
                            .then(function () {
                                authService
                                    .authorizes($scope.$data.Id)
                                    .success(function (data) {
                                        me.list = data;
                                    });
                            });
                    });
            };

            authService
                .authorizes($scope.$data.Id)
                .success(function (data) {
                    me.list = data;
                });
        }
    ]);
});