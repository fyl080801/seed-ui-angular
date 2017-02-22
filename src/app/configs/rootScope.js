/**
 * Created by fyl08 on 2016/12/28.
 */
define('app.configs.rootScope', [
    'app.configs'
], function (configs) {
    'use strict';

    configs.config([
        '$provide',
        function ($provide) {
            $provide.decorator('$rootScope', [
                '$delegate',
                '$appEnvironment',
                function ($delegate, $appEnvironment) {
                    $delegate.$data = {};
                    $delegate.$handlers = {};
                    $delegate.$stores = {};
                    $delegate.$appEnvironment = $appEnvironment;

                    $delegate.addHandler = function (name, fn) {
                        $delegate.$handlers[name] = fn;
                    };

                    $delegate.getHandler = function (name) {
                        return $delegate.$handlers[name];
                    };

                    $delegate.setData = function (data) {
                        $delegate.$data = data;
                    };

                    $delegate.getValue = function (name) {
                        return $delegate.$data[name];
                    };

                    $delegate.setValue = function (name, value) {
                        $delegate.$data[name] = value;
                    };

                    $delegate.addStore = function (name, store) {
                        $delegate.$stores[name] = store;
                    };

                    return $delegate;
                }
            ]);
        }
    ]);
});