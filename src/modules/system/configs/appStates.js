/**
 * Created by fyl08 on 2017/2/15.
 */
define('modules.system.configs.appStates', [
    'modules.system.configs'
], function (configs) {
    'use strict';

    configs.config([
        '$provide',
        function ($provide) {
            $provide.constant('$appStates', {});
        }
    ]);
});