define(["require", "exports", "app/boot", "angular"], function (require, exports, boot, angular) {
    "use strict";
    exports.__esModule = true;
    boot.config([
        '$provide',
        function ($provide) {
            var app = angular.element(document).find('#app').length > 0
                ? angular.element(document).find('#app')
                : null;
            $provide.constant('$appConfig', {
                serverUrl: app ? app.attr('data-server') : '',
                debug: app ? (eval(app.attr('data-debug')) ? true : false) : false
            });
        }
    ]);
});
//# sourceMappingURL=appConfig.js.map