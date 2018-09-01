import mod = require('modules/sample/module');
import THREE = require('three');
import L = require('leaflet');
import $ = require('jquery');

class Controller {
  private renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
  private scene: THREE.Scene = new THREE.Scene();
  private camera: THREE.Camera;
  static $inject = ['$scope', '$element'];
  constructor(private $scope, private $element: JQLite) {
    $scope.vm = this;
    $element = $($element);

    // var Element = function(id, x, y, z, ry) {
    //   var div = document.createElement('div');
    //   div.style.width = '480px';
    //   div.style.height = '360px';
    //   div.style.backgroundColor = '#000';
    //   var iframe = document.createElement('iframe');
    //   iframe.style.width = '480px';
    //   iframe.style.height = '360px';
    //   iframe.style.border = '0px';
    //   iframe.src = ['https://www.youtube.com/embed/', id, '?rel=0'].join('');
    //   div.appendChild(iframe);
    //   var object = new THREE.CSS3DObject(div);
    //   object.position.set(x, y, z);
    //   object.rotation.y = ry;
    //   return object;
    // };

    var axes = new THREE.AxesHelper(50);
    $scope.vm.scene.add(axes);

    this.camera = new THREE.PerspectiveCamera(
      75,
      $element.innerWidth() / 700,
      0.1,
      10
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
