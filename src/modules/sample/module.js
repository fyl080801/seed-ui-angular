define(["require", "exports", "angular"], function (require, exports, angular) {
    "use strict";
    exports.__esModule = true;
    var SampleModule = (function () {
        function SampleModule($stateProvider, $urlRouterProvider) {
            $stateProvider.state('home', {
                url: '/home',
                templateUrl: 'modules/sample/components/home.html',
                requires: ['modules/sample/requires']
            });
            $urlRouterProvider.otherwise('/home');
        }
        SampleModule.$inject = ['$stateProvider', '$urlRouterProvider'];
        return SampleModule;
    }());
    exports["default"] = angular.module('modules.sample', []).config(SampleModule);
});
//# sourceMappingURL=module.js.map