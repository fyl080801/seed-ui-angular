define(["require", "exports", "app/boot"], function (require, exports, boot) {
    "use strict";
    exports.__esModule = true;
    var AjaxState = (function () {
        function AjaxState() {
            this.loading = false;
        }
        return AjaxState;
    }());
    var AppEnvironment = (function () {
        function AppEnvironment() {
            this.ajaxState = new AjaxState();
        }
        return AppEnvironment;
    }());
    var AppEnvironmentConfig = (function () {
        function AppEnvironmentConfig($provide) {
            $provide.constant('$appEnvironment', new AppEnvironment());
        }
        return AppEnvironmentConfig;
    }());
    AppEnvironmentConfig.$inject = ['$provide'];
    boot.config(AppEnvironmentConfig);
});
//# sourceMappingURL=appEnvironment.js.map