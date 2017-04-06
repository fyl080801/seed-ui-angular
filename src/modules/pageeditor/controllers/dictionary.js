/**
 * Created by fyl08 on 2017/3/11.
 */
define('modules.pageeditor.controllers.dictionary', [
    'modules.pageeditor.module'
], function (module) {
    'use strict';

    module.controller('modules.pageeditor.controllers.dictionary', [
        '$scope',
        '$modal',
        function ($scope, $modal) {
            var me = this;

            var form = [{
                key: 'Name',
                type: 'input',
                templateOptions: {
                    required: true,
                    label: '名称',
                    placeholder: '输入名称'
                }
            }];

            this.create = function () {
                $modal
                    .open({
                        templateUrl: 'views/pageeditor/dictionary/Form.html',
                        data: {
                            form: form
                        }
                    }).result
                    .then(function (data) {
                        console.log(data);
                    });
            };

            this.list = {
                actions: {
                    edit: function (record) {

                    },
                    drop: function (record) {

                    }
                }
            }
        }
    ]);
});