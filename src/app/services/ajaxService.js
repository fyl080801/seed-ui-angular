define([
    'app/services'
], function (services) {
    'use strict';

    services.service('app.services.ajaxService', [
        '$q',
        '$modal',
        '$appConfig',
        'app.factories.httpDataHandler',
        function ($q, $modal, $appConfig, httpDataHandler) {
            var me = this;

            this.resolveUrl = function (url) {
                return (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) ? url : $appConfig.serverUrl + url;
            };

            this.get = function (url) {
                var defer = $q.defer();
                $.ajax({
                    type: 'GET',
                    url: me.resolveUrl(url),
                    success: function (response) {
                        httpDataHandler.doResponse({
                            data: response
                        }, defer);
                    },
                    error: function (response) {
                        httpDataHandler.doError({
                            data: response
                        }, defer);
                    }
                });
                return defer.promise;
            };

            this.post = function (url, params) {
                var defer = $q.defer();
                $.ajax({
                    type: 'POST',
                    data: params,
                    url: me.resolveUrl(url),
                    success: function (response) {
                        httpDataHandler.doResponse({
                            data: response
                        }, defer);
                    },
                    error: function (response) {
                        httpDataHandler.doError({
                            data: response
                        }, defer);
                    }
                });
                return defer.promise;
            };
        }
    ]);
});