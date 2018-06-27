define(["require", "exports", "app/boot", "jquery"], function (require, exports, boot, $) {
    "use strict";
    exports.__esModule = true;
    boot.config([
        '$provide',
        function ($provide) {
            var app = $('#app').length > 0 ? $('#app') : null;
            $provide.constant('$appConfig', {
                serverUrl: app ? app.attr('data-server') : '',
                debug: app ? (eval(app.attr('data-debug')) ? true : false) : false
            });
        }
    ]);
});
//# sourceMappingURL=appConfig.js.map