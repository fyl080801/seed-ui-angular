/**
 * Created by fyl08 on 2017/3/4.
 */
define('modules.system.configs.httpConfig', [
    'modules.system.configs'
], function (configs) {
    'use strict';

    configs.config([
        '$provide',
        function ($provide) {
            $provide.decorator('app.factories.httpDataHandler', [
                '$delegate',
                function ($delegate) {
                    var responseFn = $delegate.doResponse;

                    $delegate.doResponse = function (response, defer) {

                        // 准备处理会话过期事件
                        responseFn(response, defer);
                    };
                }
            ]);
        }
    ]);
});