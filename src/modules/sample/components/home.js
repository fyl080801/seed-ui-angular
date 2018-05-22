define(["require", "exports", "modules/sample/module"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    'use strict';
    var HomeController = /** @class */ (function () {
        function HomeController($scope) {
            this.$scope = $scope;
            $scope['text'] = 'aaaaaaa';
        }
        HomeController.$inject = ['$scope'];
        return HomeController;
    }());
    mod["default"].controller('modules/sample/components/home', HomeController);
});
//# sourceMappingURL=home.js.map