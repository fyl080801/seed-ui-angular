import mod = require('modules/sample/module');
//import THREE = require('three');
import $ = require('jquery');

class Controller {
  private renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
  private scene: THREE.Scene = new THREE.Scene();
  private camera: THREE.Camera;
  static $inject = ['$scope', '$element'];
  constructor(private $scope, private $element: JQLite) {
    $scope.vm = this;
    $element = $($element);

    this.camera = new THREE.PerspectiveCamera(
      75,
      $element.innerWidth() / 700,
      0.1,
      1000
    );

    this.renderer.setSize($element.innerWidth(), 700);

    $element.append(this.renderer.domElement);

    // run
    function render() {
      requestAnimationFrame(render);
      update();
    }

    function update() {
      $scope.vm.renderer.render($scope.vm.scene, $scope.vm.camera);
    }

    render();
  }
}

mod.controller('modules/sample/components/threeDemo', Controller);
