/**
 * Created by fyl08 on 2016/12/28.
 */
define('app.factories.httpState', [
    'app.factories'
], function (factories) {
    'use strict';

    factories.factory('app.factories.httpState',
        [
            '$q',
            '$appEnvironment',
            function ($q, $appEnvironment) {
                return {
                    request: function (config) {
                        $appEnvironment.ajaxState = {
                            loading: true,
                            url: config.url,
                            method: config.method,
                            data: config.data
                        };
                        return config;
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
                }
            }
        ]);
});