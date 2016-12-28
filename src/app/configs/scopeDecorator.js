/**
 * Created by fyl08 on 2016/12/28.
 */
define('app.configs.scopeDecorator', [
    'app.configs'
], function (configs) {
    'use strict';

    configs.config(
        [
            '$provide',
            function ($provide) {
                $provide.decorator('$rootScope',
                    [
                        '$delegate',
                        '$appEnvironment',
                        function ($delegate, $appEnvironment) {
                            $delegate.$data = {};
                            $delegate.$handlers = {};
                            $delegate.$stores = {};
                            $delegate.$appEnvironment = $appEnvironment;
                            return $delegate;
                        }
                    ]
                );
            }
        ]
    );
});