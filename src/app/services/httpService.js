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
                var defered = $q.defer();
                $http({
                    method: 'get',
                    url: me.resolveUrl(url),
                    withCredentials: true
                })
                    .then(function (response) {
                        httpDataHandler.doResponse(response, defered);
                    }, function (response) {
                        httpDataHandler.doError(response, defered);
                    });
                return defered.promise;
            };

            me.post = function (url, params) {
                var defered = $q.defer();
                $http({
                    method: 'post',
                    data: params,
                    url: me.resolveUrl(url),
                    withCredentials: true
                })
                    .then(function (response) {
                        httpDataHandler.doResponse(response, defered);
                    }, function (response) {
                        httpDataHandler.doError(response, defered);
                    });
                return defered.promise;
            };
        }
    ]);
});