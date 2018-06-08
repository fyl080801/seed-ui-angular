define(["require", "exports", "app/boot", "angular"], function (require, exports, boot, angular) {
    "use strict";
    exports.__esModule = true;
    function factory(popupService) {
        return {
            doResponse: function (response, defer) {
                response.data = angular.extend({
                    success: false
                }, response.data);
                if (response.data.success) {
                    defer.resolve(response.data.data);
                }
                else {
                    this.doError(response, defer);
                }
            },
            doError: function (response, defer) {
                response.data = angular.extend({
                    success: false
                }, response.data);
                popupService.error(response.data.message);
                defer.reject(response.data);
            }
        };
    }
    factory.$inject = ['app/services/popupService'];
    boot.factory('app/factories/httpDataHandler', factory);
});
//# sourceMappingURL=httpDataHandler.js.map