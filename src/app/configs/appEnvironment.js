define([
    'app/boot'
], function (boot) {
    'use strict';

    boot.config([
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