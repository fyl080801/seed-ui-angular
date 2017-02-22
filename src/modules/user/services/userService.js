/**
 * Created by fyl08 on 2017/1/22.
 */
define('modules.user.services.userService', [
    'modules.user'
], function (user) {
    'use strict';

    user.service('modules.user.services.userService', [
        'app.services.popupService',
        'app.services.httpService',
        function (popupService, httpService) {
            this.load = function (id) {
                return httpService
                    .get('/ProgramPublish/GroupUser/Load/' + id);
            };

            this.save = function (data) {
                return httpService
                    .post('/ProgramPublish/GroupUser/Save', data)
                    .then(function () {
                        popupService.infomation();
                    });
            };

            this.drop = function (id) {
                return httpService
                    .get('/User/Delete/' + id)
                    .then(function () {
                        popupService.infomation();
                    });
            };

            this.setPassword = function (id, password) {
                return httpService
                    .post('/Account/SetPassword', {
                        Id: id,
                        Password: password
                    })
                    .then(function () {
                        popupService.infomation();
                    });
            };
        }
    ]);
});