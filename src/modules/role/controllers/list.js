/**
 * Created by fyl08 on 2017/1/16.
 */
define('modules.role.controllers.list', [
    'modules.role.module'
], function (module) {
    'use strict';

    module.controller('modules.role.controllers.list', [
        '$scope',
        '$modal',
        'app.services.popupService',
        'modules.role.services.roleService',
        function ($scope, $modal, popupService, roleService) {
            var me = this;
            me.create = function () {
                $modal
                    .open({
                        templateUrl: 'views/role/Form.html'
                    }).result
                    .then(function (data) {
                        roleService
                            .save(data)
                            .then(function () {
                                me.list.reload();
                            });
                    });
            };

            me.details = function (record) {
                roleService
                    .load(record.Id)
                    .then(function (data) {
                        $modal
                            .open({
                                templateUrl: 'views/role/Details.html',
                                data: data.data,
                                handlers: {
                                    edit: me.edit,
                                    member: me.member,
                                    auth: me.auth
                                }
                            });
                    });
            };

            me.edit = function (record) {
                roleService
                    .load(record.Id)
                    .then(function (data) {
                        $modal
                            .open({
                                templateUrl: 'views/role/Form.html',
                                single: true,
                                data: data.data
                            }).result
                            .then(function (data) {
                                roleService
                                    .save(data)
                                    .then(function () {
                                        me.list.reload();
                                    });
                            });
                    });
            };

            me.member = function (record) {
                $modal
                    .open({
                        templateUrl: 'views/role/Members.html',
                        data: record,
                        size: 'lg'
                    });
            };

            me.auth = function (record) {
                $modal
                    .open({
                        templateUrl: 'views/role/Auth.html',
                        data: record
                    });
            };

            me.drop = function (record) {
                popupService
                    .confirm('是否删除？', 'sm')
                    .then(function () {
                        roleService
                            .drop(record.Id)
                            .then(function () {
                                me.list.reload();
                            });
                    });
            };

            me.list = {
                params: {
                    searchPhrase: null
                },
                actions: {
                    details: me.details,
                    edit: me.edit,
                    member: me.member,
                    auth: me.auth,
                    drop: me.drop
                },
                converters: {
                    conv: function (record) {
                        return record.Name;
                    }
                },
                behaviors: {
                    popalert: {
                        click: me.details
                    }
                }
            };
        }
    ]);
});