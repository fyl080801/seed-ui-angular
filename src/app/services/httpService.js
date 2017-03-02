/**
 * Created by fyl08 on 2016/12/23.
 */
define('app.services.httpService', [
    'app.services'
], function (services) {
    'use strict';

    services.service('app.services.httpService', [
        '$http',
        '$q',
        '$modal',
        '$appConfig',
        'app.factories.httpDataHandler',
        function ($http, $q, $modal, $appConfig, httpDataHandler) {
            var me = this;

            me.resolveUrl = function (url) {
                return url.indexOf('http://') === 0 ? url : $appConfig.serverUrl + url;
            };

            me.get = function (url) {
                var defer = $q.defer();
                $http({
                    method: 'get',
                    url: me.resolveUrl(url),
                    withCredentials: true
                })
                    .then(function (response) {
                        httpDataHandler.doResponse(response, defer);
                    }, function (response) {
                        httpDataHandler.doError(response, defer);
                    });
                return defer.promise;
            };

            me.post = function (url, params) {
                var defer = $q.defer();
                $http({
                    method: 'post',
                    data: params,
                    url: me.resolveUrl(url),
                    withCredentials: true
                })
                    .then(function (response) {
                        httpDataHandler.doResponse(response, defer);
                    }, function (response) {
                        httpDataHandler.doError(response, defer);
                    });
                return defer.promise;
            };
        }
    ]);
});