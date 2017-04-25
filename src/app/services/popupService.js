/**
 * Created by fyl08 on 2016/12/28.
 */
define('app.services.popupService', [
    'app.services'
], function (services) {
    'use strict';

    services.service('app.services.popupService', [
        '$rootScope',
        '$modal',
        '$q',
        function ($rootScope, $modal, $q) {
            this.infomation = function (text, size) {
                var defered = $q.defer();
                $modal
                    .open({
                        templateUrl: 'templates/modal/Information.html',
                        size: size ? size : 'sm',
                        data: {
                            text: text ? text : '操作成功'
                        }
                    }).result
                    .then(function (result) {
                        defered.resolve();
                    });
                return defered.promise;
            };

            this.confirm = function (text, size) {
                var defered = $q.defer();

                defered.promise.ok = function (fn) {
                    defered.promise
                        .then(fn);
                    return defered.promise;
                };

                defered.promise.cancel = function (fn) {
                    defered.promise
                        .catch(fn);
                    return defered.promise;
                };

                $modal
                    .open({
                        templateUrl: 'templates/modal/Confirm.html',
                        size: size ? size : 'sm',
                        data: {
                            text: text ? text : '是否确认操作？'
                        }
                    }).result
                    .then(function (result) {
                        if (result === 'ok') {
                            defered.resolve(result);
                        } else {
                            defered.reject(result);
                        }
                    });
                return defered.promise;
            };

            this.error = function (text, size) {
                var defered = $q.defer();
                var _data = {};
                if (text === null || text === undefined) {
                    _data.text = '发生错误';
                } else if (Object.prototype.toString.call(text) == '[object Array]') {
                    _data.contents = text;
                } else {
                    _data.text = text;
                }
                $modal
                    .open({
                        templateUrl: 'templates/modal/Error.html',
                        size: size ? size : 'sm',
                        data: _data
                    }).result
                    .then(function (result) {
                        defered.resolve(result);
                    });
                return defered.promise;
            };
        }
    ]);
});