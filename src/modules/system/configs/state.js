/**
 * Created by fyl08 on 2017/2/15.
 */
define('modules.system.configs.state', [
    'modules.system.configs'
], function (configs) {
    'use strict';

    configs.config([
        '$stateProvider',
        '$appStates',
        function ($stateProvider, $appStates) {
            var stateFn = $stateProvider.state;
            $stateProvider.state = function (state, options) {
                stateFn(state, options);
                $appStates[state] = options;
            };
        }
    ]);
});