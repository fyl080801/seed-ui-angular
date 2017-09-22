define([
    'app/factories'
], function (factories) {
    'use strict';

    factories.factory('app.factories.httpState', [
        '$q',
        '$appEnvironment',
        function ($q, $appEnvironment) {
            return {
                request: function (configs) {
                    $appEnvironment.ajaxState = {
                        loading: true,
                        url: configs.url,
                        method: configs.method,
                        data: configs.data
                    };
                    return configs;
                },
                requestError: function (err) {
                    $appEnvironment.ajaxState = {
                        loading: false,
                        url: null,
                        method: null,
                        data: null
                    };
                    return err;
                },
                response: function (response) {
                    $appEnvironment.ajaxState = {
                        loading: false,
                        url: null,
                        method: null,
                        data: null
                    };
                    return response;
                },
                responseError: function (err) {
                    $appEnvironment.ajaxState = {
                        loading: false,
                        url: null,
                        method: null,
                        data: null
                    };
                    return err;
                }
            };
        }
    ]);
});