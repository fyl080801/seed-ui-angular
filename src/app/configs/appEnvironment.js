define([
    'app/configs'
], function (configs) {
    'use strict';

    configs.config([
        '$provide',
        function ($provide) {
            $provide.constant('$appEnvironment', {
                ajaxState: {
                    loading: false,
                    url: null,
                    method: null,
                    data: null
                },
                theme: null
            });
        }
    ]);
});