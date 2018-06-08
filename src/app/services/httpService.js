define(["require", "exports", "app/boot"], function (require, exports, boot) {
    "use strict";
    exports.__esModule = true;
    var RequestPromise = (function () {
        function RequestPromise(defer) {
            this.defer = defer;
        }
        RequestPromise.prototype.cancel = function () {
            this.defer.resolve();
        };
        RequestPromise.prototype.then = function (successCallback, errorCallback, notifyCallback) {
            return this.defer.promise.then(successCallback, errorCallback, notifyCallback);
        };
        RequestPromise.prototype["catch"] = function (onRejected) {
            return this.defer.promise["catch"](onRejected);
        };
        RequestPromise.prototype["finally"] = function (finallyCallback) {
            return this.defer.promise["finally"](finallyCallback);
        };
        return RequestPromise;
    }());
    var HttpService = (function () {
        function HttpService($http, $q, $appConfig, httpDataHandler) {
            this.$http = $http;
            this.$q = $q;
            this.$appConfig = $appConfig;
            this.httpDataHandler = httpDataHandler;
        }
        HttpService.prototype.get = function (url) {
            var defer = this.$q.defer();
            var promise = new RequestPromise(defer);
            var self = this;
            this.$http({
                method: 'get',
                url: this.resolveUrl(url),
                withCredentials: false,
                timeout: promise
            })
                .then(function (response) {
                self.httpDataHandler.doResponse(response, defer);
            })["catch"](function (response) {
                self.httpDataHandler.doError(response, defer);
            });
            return promise;
        };
        HttpService.prototype.post = function (url, param) {
            var defer = this.$q.defer();
            var promise = new RequestPromise(defer);
            var self = this;
            this.$http({
                method: 'post',
                data: param,
                url: this.resolveUrl(url),
                withCredentials: false,
                timeout: promise,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            })
                .then(function (response) {
                self.httpDataHandler.doResponse(response, defer);
            })["catch"](function (response) {
                self.httpDataHandler.doError(response, defer);
            });
            return promise;
        };
        HttpService.prototype.resolveUrl = function (url) {
            return url.indexOf('http://') === 0 || url.indexOf('https://') === 0
                ? url
                : this.$appConfig.serverUrl + url;
        };
        HttpService.$inject = [
            '$http',
            '$q',
            '$appConfig',
            'app/factories/httpDataHandler'
        ];
        return HttpService;
    }());
    boot.service('app/services/httpService', HttpService);
});
//# sourceMappingURL=httpService.js.map