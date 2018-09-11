define(["require", "exports", "app/boot"], function (require, exports, boot) {
    "use strict";
    exports.__esModule = true;
    var HttpConfig = (function () {
        function HttpConfig($httpProvider) {
            $httpProvider.defaults.headers.get = !$httpProvider.defaults.headers.get
                ? {}
                : $httpProvider.defaults.headers.get;
            $httpProvider.defaults.headers.get['If-Modified-Since'] =
                'Mon, 26 Jul 1997 05:00:00 GMT';
            $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
            $httpProvider.defaults.headers.get.Pragma = 'no-cache';
            $httpProvider.interceptors.push('app/factories/httpState');
        }
        return HttpConfig;
    }());
    HttpConfig.$inject = ['$httpProvider'];
    boot.config(HttpConfig);
});
//# sourceMappingURL=http.js.map