/**
 * Created by fyl08 on 2017/3/12.
 */
define('modules.plugin.controllers.list', [
    'modules.plugin.module'
], function (module) {
    'use strict';

    module.controller('modules.plugin.controllers.list', [
        '$scope',
        'app.services.popupService',
        'app.services.httpService',
        function ($scope, popupService, httpService) {
            var me = this;

            this.install = function (record) {
                popupService
                    .confirm('是否安装？')
                    .ok(function () {
                        httpService
                            .get('/Plugin/Install/?id=' + record.PluginId)
                            .then(function () {
                                popupService
                                    .infomation()
                                    .then(function () {
                                        me.list.reload();
                                    });
                            });
                    });
            };

            this.uninstall = function (record) {
                popupService
                    .confirm('是否卸载？')
                    .ok(function () {
                        httpService
                            .get('/Plugin/Uninstall/?id=' + record.PluginId)
                            .then(function () {
                                popupService
                                    .infomation()
                                    .then(function () {
                                        me.list.reload();
                                    });
                            });
                    });
            };

            this.list = {
                pagination: false,
                params: {
                    keyword: null
                },
                actions: {
                    install: me.install,
                    uninstall: me.uninstall
                },
                renderers: {
                    canInstall: function (record, i, element) {
                        if (record.Installed) {
                            element.attr('disabled', 'disabled');
                        }
                    },
                    canUninstall: function (record, i, element) {
                        if (!record.Installed) {
                            element.attr('disabled', 'disabled');
                        }
                    }
                }
            };
        }
    ]);
});