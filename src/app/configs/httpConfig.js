/**
 * Created by fyl08 on 2016/12/28.
 */
define('app.configs.httpConfig', [
    'app.configs'
], function (configs) {
    'use strict';

    configs.config(
        [
            '$httpProvider',
            function ($httpProvider) {
                if (!$httpProvider.defaults.headers.get) {
                    $httpProvider.defaults.headers.get = {};
                }
                $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
                $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
                $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';

                $httpProvider.interceptors.push('app.factories.httpState');
            }
        ]
    );
});