/**
 * Created by fyl08 on 2016/12/28.
 */
define('app.services.modalService', [
    'app.services'
], function (services) {
    'use strict';

    services.service('app.services.modalService',
        [
            '$rootScope',
            '$modal',
            '$q',
            function ($rootScope, $modal, $q) {
                this.infomation = function (text) {
                    var defered = $q.defer();
                    var scope = $rootScope.$new();
                    scope.text = text ? text : '操作成功';
                    $modal.open({
                        templateUrl: 'templates/information.html',
                        scope: scope
                    }).result.then(function (result) {
                        defered.resolve();
                    });
                    return defered.promise;
                };

                this.confirm = function (text, size) {
                    var defered = $q.defer();
                    var scope = $rootScope.$new();
                    scope.text = text ? text : '是否确认操作？';
                    $modal.open({
                        templateUrl: 'templates/confirm.html',
                        size: size,
                        scope: scope
                    }).result.then(function (result) {
                        if (result === 'ok') {
                            defered.resolve();
                        } else {
                            defered.reject();
                        }
                    });
                    return defered.promise;
                };
            }
        ]);
});