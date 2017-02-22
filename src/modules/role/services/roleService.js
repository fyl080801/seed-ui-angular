/**
 * Created by fyl08 on 2017/1/21.
 */
define('modules.role.services.roleService', [
    'modules.role'
], function (role) {
    'use strict';

    role.service('modules.role.services.roleService', [
        'app.services.popupService',
        'app.services.httpService',
        function (popupService, httpService) {
            this.load = function (id) {
                return httpService.get('/Role/Details/' + id);
            };

            this.save = function (data) {
                return httpService
                    .post('/Role/Save', data)
                    .then(function () {
                        popupService.infomation();
                    });
            };

            this.setMember = function (id, members) {
                return httpService
                    .post('/Role/SetMembers/' + id, members)
                    .then(function () {
                        popupService.infomation();
                    });
            };

            this.drop = function (id) {
                return httpService.get('/Role/Delete/' + id)
                    .then(function () {
                        popupService.infomation();
                    });
            }
        }
    ]);
});