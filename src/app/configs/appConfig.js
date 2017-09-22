define([
    'app/configs'
], function (configs) {
    'use strict';

    configs.config([
        '$provide',
        function ($provide) {
            var app = $('#app').length > 0 ? $('#app') : null;
            $provide.constant('$appConfig', {
                serverUrl: app ? app.attr('data-server') : '',
                debug: app ? (eval(app.attr('data-debug')) ? true : false) : false
            });
        }
    ]);
});