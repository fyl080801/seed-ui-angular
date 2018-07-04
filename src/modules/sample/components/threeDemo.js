define(["require", "exports", "modules/sample/module", "three"], function (require, exports, mod, THREE) {
    "use strict";
    exports.__esModule = true;
    var Controller = (function () {
        function Controller($scope, $element) {
            this.$scope = $scope;
            this.$element = $element;
            this.renderer = new THREE.WebGLRenderer();
        }
        Controller.$inject = ['$scope', '$element'];
        return Controller;
    }());
    mod.controller('modules/sample/components/threeDemo', Controller);
});
//# sourceMappingURL=threeDemo.js.map