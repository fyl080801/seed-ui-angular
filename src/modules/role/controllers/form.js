/**
 * Created by fyl08 on 2017/1/21.
 */
define('modules.role.controllers.form', [
    'modules.role.module'
], function (module) {
    'use strict';

    module.controller('modules.role.controllers.form', [
        '$scope',
        function ($scope) {
            this.fields = [{
                key: 'Name',
                type: 'input',
                templateOptions: {
                    required: true,
                    label: '角色名',
                    placeholder: '角色名'
                }
            }, {
                key: 'Description',
                type: 'textarea',
                templateOptions: {
                    label: '描述',
                    placeholder: '描述信息',
                    rows: 4
                }
            }];

            this.edit = $scope.$handlers.edit;

            this.member = $scope.$handlers.member;

            this.auth = $scope.$handlers.auth;
        }
    ]);
});