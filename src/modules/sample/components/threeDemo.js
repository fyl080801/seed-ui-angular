define(["require", "exports", "modules/sample/module", "three"], function (require, exports, mod, THREE) {
    "use strict";
    exports.__esModule = true;
    var Controller = (function () {
        function Controller($scope, $element) {
            this.$scope = $scope;
            this.$element = $element;
            this.renderer = new THREE.WebGLRenderer();
            this.scene = new THREE.Scene();
            $scope.vm = this;
            var axes = new THREE.AxesHelper(50);
            $scope.vm.scene.add(axes);
            this.camera = new THREE.PerspectiveCamera(75, $element.innerWidth() / 700, 0.1, 10);
            this.renderer.setSize($element.innerWidth(), 700);
            $element.append(this.renderer.domElement);
            function render() {
                requestAnimationFrame(render);
                update();
            }
            function update() {
                $scope.vm.renderer.render($scope.vm.scene, $scope.vm.camera);
            }
            render();
        }
        Controller.$inject = ['$scope', '$element'];
        return Controller;
    }());
    mod.controller('modules/sample/components/threeDemo', Controller);
});
//# sourceMappingURL=threeDemo.js.map