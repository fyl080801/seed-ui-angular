/**
 * Created by fyl08 on 2017/2/21.
 */
define('modules.role.controllers.member', [
    'modules.role.module'
], function (module) {
    'use strict';

    module.controller('modules.role.controllers.member', [
        '$scope',
        '$modal',
        'modules.role.services.roleService',
        function ($scope, $modal, roleService) {
            var me = this;

            me.checkList = null;

            me.edit = function (data) {
                $modal
                    .open({
                        templateUrl: 'views/role/MemberEdit.html',
                        data: data,
                        size: 'lg'
                    }).result
                    .then(function (result) {
                        var members = [];
                        for (var id in result) {
                            members.push(result[id]);
                        }
                        if (members.length <= 0)return;
                        roleService
                            .setMember($scope.$data.Id, members)
                            .then(function () {
                                me.list.reload();
                            });
                    });
            };

            me.list = {
                url: '/Role/RoleMembers/' + $scope.$data.Id
            };

            me.users = {
                url: '/Role/Members/' + $scope.$data.Id,
                onCheck: addCheck,
                onUncheck: removeCheck,
                onCheckAll: function (records) {
                    for (var index in records) {
                        addCheck(records[index]);
                    }
                },
                onUncheckAll: function (records) {
                    for (var index in records) {
                        removeCheck(records[index]);
                    }
                }
            };

            function addCheck(record) {
                if (!me.checkList) {
                    me.checkList = {};
                    $scope.$apply();
                }
                record.IsMember = true;
                me.checkList[record.Id] = record;
            }

            function removeCheck(record) {
                if (!me.checkList) {
                    me.checkList = {};
                    $scope.$apply();
                }
                record.IsMember = false;
                me.checkList[record.Id] = record;
            }
        }
    ]);
});