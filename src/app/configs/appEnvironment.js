/**
 * Created by fyl08 on 2016/12/28.
 */
define('app.configs.appEnvironment', [
    'app.configs'
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
                }
            });
        }
    ]);
});