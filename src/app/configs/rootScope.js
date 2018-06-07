define(["require", "exports", "app/boot"], function (require, exports, boot) {
    "use strict";
    exports.__esModule = true;
    var ConfigClass = (function () {
        function ConfigClass($provide) {
            ConfigClass.decorator.$inject = ['$delegate', '$appEnvironment'];
            $provide.decorator('$rootScope', ConfigClass.decorator);
        }
        ConfigClass.decorator = function ($delegate, $appEnvironment) {
            $delegate.$appEnvironment = $appEnvironment;
            return $delegate;
        };
        return ConfigClass;
    }());
    ConfigClass.$inject = ['$provide'];
    boot.config(ConfigClass);
});
//# sourceMappingURL=rootScope.js.map