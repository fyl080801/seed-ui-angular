define(["require", "exports", "app/application", "angular"], function (require, exports, application) {
    "use strict";
    exports.__esModule = true;
    'use strict';
    var angular = window['angular'];
    application['requires'].push('modules.sample');
    exports["default"] = angular.module('modules.sample', []).config([
        '$stateProvider',
        '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state('home', {
                url: '/home',
                templateUrl: 'modules/sample/components/home.html',
                requires: ['modules/sample/requires']
            });
            $urlRouterProvider.otherwise('/home');
        }
    ]);
});
//# sourceMappingURL=module.js.map