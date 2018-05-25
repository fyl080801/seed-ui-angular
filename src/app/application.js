define(["require", "exports", "angular", "app/configs/appConfig", "app/configs/dependencyLoader", "app/configs/appEnvironment", "app/configs/rootScope", "app/configs/modal", "app/configs/http", "app/configs/run", "app/factories/httpState", "app/factories/httpDataHandler", "app/services/ajaxService", "app/services/httpService", "app/services/popupService", "app/directives/title", "app/directives/theme", "app/directives/equals"], function (require, exports, angular) {
    "use strict";
    var application = angular.module('app.application', ['app.boot']);
    var fn = angular.module;
    angular.module = function (name, requires, configFn) {
        var app = fn(name, requires, configFn);
        app.config([
            '$controllerProvider',
            '$compileProvider',
            '$filterProvider',
            '$provide',
            function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
                app.controller = $controllerProvider.register;
                app.directive = $compileProvider.directive;
                app.filter = $filterProvider.register;
                app.factory = $provide.factory;
                app.service = $provide.service;
            }
        ]);
        if (name !== 'app.application' && application.requires.indexOf(name) < 0)
            application.requires.push(name);
        return app;
    };
    return application;
});
//# sourceMappingURL=application.js.map