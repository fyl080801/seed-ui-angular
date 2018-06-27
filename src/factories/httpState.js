define(["require", "exports", "app/boot"], function (require, exports, boot) {
    "use strict";
    exports.__esModule = true;
    function factory($appEnvironment) {
        return {
            request: function (config) {
                $appEnvironment.ajaxState.loading = true;
                $appEnvironment.ajaxState.url = config.url;
                $appEnvironment.ajaxState.method = config.method;
                $appEnvironment.ajaxState.data = config.data;
                return config;
            },
            requestError: function (rejection) {
                $appEnvironment.ajaxState.loading = false;
                $appEnvironment.ajaxState.url = null;
                $appEnvironment.ajaxState.method = null;
                $appEnvironment.ajaxState.data = null;
                return rejection;
            },
            response: function (response) {
                $appEnvironment.ajaxState.loading = false;
                $appEnvironment.ajaxState.url = null;
                $appEnvironment.ajaxState.method = null;
                $appEnvironment.ajaxState.data = null;
                return response;
            },
            responseError: function (rejection) {
                $appEnvironment.ajaxState.loading = false;
                $appEnvironment.ajaxState.url = null;
                $appEnvironment.ajaxState.method = null;
                $appEnvironment.ajaxState.data = null;
                return rejection;
            }
        };
    }
    factory.$inject = ['$appEnvironment'];
    boot.factory('app/factories/httpState', factory);
});
//# sourceMappingURL=httpState.js.map