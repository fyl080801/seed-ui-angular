/**
 * Created by fyl08 on 2017/1/4.
 */
define('modules.user.controllers.list', [
    'modules.user.module'
], function (module) {
    'use strict';

    module.controller('modules.user.controllers.list', [
        '$scope',
        '$modal',
        'app.services.popupService',
        'modules.user.services.userService',
        function ($scope, $modal, popupService, userService) {
            var me = this;

            me.create = function () {
                $modal
                    .open({
                        templateUrl: 'views/user/New.html',
                        data: {}
                    }).result
                    .then(function (data) {
                        userService
                            .save(data)
                            .then(function () {
                                me.list.reload();
                            });
                    });
            };

            me.details = function (record) {
                userService
                    .load(record.Id)
                    .then(function (data) {
                        $modal
                            .open({
                                templateUrl: 'views/user/Details.html',
                                data: data.data,
                                handlers: {
                                    edit: me.edit
                                }
                            });
                    });
            };

            me.edit = function (record) {
                userService
                    .load(record.Id)
                    .then(function (data) {
                        $modal
                            .open({
                                templateUrl: 'views/user/Form.html',
                                single: true,
                                data: data.data
                            }).result
                            .then(function (data) {
                                userService
                                    .save(data)
                                    .then(function () {
                                        me.list.reload();
                                    });
                            });
                    });
            };

            me.drop = function (record) {
                popupService
                    .confirm('是否删除？', 'sm')
                    .then(function () {
                        userService
                            .drop(record.Id)
                            .then(function () {
                                me.list.reload();
                            });
                    });
            };

            me.setPassword = function (record) {
                $modal
                    .open({
                        templateUrl: 'views/user/Password.html',
                        data: {
                            Id: record.id
                        },
                        size: 'sm'
                    }).result
                    .then(function (data) {
                        userService
                            .setPassword(data.Id, data.Password);
                    });
            };

            me.list = {
                params: {
                    searchPhrase: null
                },
                actions: {
                    details: me.details,
                    edit: me.edit,
                    drop: me.drop,
                    setPassword: me.setPassword
                }
            };
        }
    ]);
});