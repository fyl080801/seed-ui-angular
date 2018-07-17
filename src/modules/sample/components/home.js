define(["require", "exports", "modules/sample/module"], function (require, exports, mod) {
    "use strict";
    exports.__esModule = true;
    var HomeController = (function () {
        function HomeController($scope, $modal) {
            this.$scope = $scope;
            this.$modal = $modal;
            $scope.vm = this;
            $scope['text'] = 'aaaaaaa';
        }
        HomeController.prototype.testmodal = function () {
            this.$modal.open({
                template: '<div>aaa</div>',
                windowClass: 'right',
                size: '7',
                backdrop: true
            });
        };
        HomeController.$inject = ['$scope', '$modal'];
        return HomeController;
    }());
    mod.controller('modules/sample/components/home', HomeController);
});
//# sourceMappingURL=home.js.map