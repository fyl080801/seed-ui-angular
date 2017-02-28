/**
 * Created by fyl08 on 2017/1/4.
 */
define('modules.system.controllers.login', [
    'modules.system.module'
], function (module) {
    'use strict';

    module.controller('modules.system.controllers.login', [
        '$scope',
        '$state',
        '$appEnvironment',
        'modules.system.services.sessionService',
        function ($scope, $state, $appEnvironment, sessionService) {
            var me = this;
            var $modal = $('#loginForm');
            $modal
                .on('shown.bs.modal', function () {
                    var $this = $(this);
                    var $modal_dialog = $this.find('.modal-dialog');
                    var m_top = ($(document).height() - $modal_dialog.height()) / 2;
                    $modal_dialog.css({'margin': m_top + 'px auto'});
                });
            $modal
                .modal({
                    backdrop: false,
                    keyboard: false,
                    refreshPositions: false
                });

            this.login = function () {
                sessionService
                    .login(me.username, me.password)
                    .success(function () {
                        $state.go('main');
                    });
            };
        }
    ]);
});