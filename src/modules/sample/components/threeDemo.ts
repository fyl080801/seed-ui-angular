import mod = require('modules/sample/module');
import THREE = require('three');

class Controller {
  private renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
  private scene: THREE.Scene;
  private camera: THREE.Camera;
  static $inject = ['$scope', '$element'];
  constructor(private $scope, private $element: JQLite) {}
}

mod.controller('modules/sample/components/threeDemo', Controller);
