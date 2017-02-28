/**
 * Created by fyl08 on 2017/1/4.
 */
define('modules.user.controllers.form', [
    'modules.user.module'
], function (module) {
    'use strict';

    module.controller('modules.user.controllers.form', [
        '$scope',
        function ($scope) {
            this.fields = [{
                key: 'Username',
                type: 'input',
                templateOptions: {
                    required: true,
                    label: '用户名',
                    placeholder: '输入用户名'
                }
            }, {
                className: 'row',
                elementAttributes: {
                    'root-el': 'div'
                },
                fieldGroup: [{
                    className: 'col-md-6',
                    key: 'LastName',
                    type: 'input',
                    templateOptions: {
                        label: '姓',
                        placeholder: '输入姓氏'
                    }
                }, {
                    className: 'col-md-6',
                    key: 'FirstName',
                    type: 'input',
                    templateOptions: {
                        label: '名',
                        placeholder: '输入名'
                    }
                }]
            }, {
                key: 'Email',
                type: 'input',
                templateOptions: {
                    required: true,
                    label: '邮箱',
                    type: 'email',
                    placeholder: '输入邮箱'
                }
            }];

            this.edit = $scope.$handlers.edit;
        }
    ]);
});