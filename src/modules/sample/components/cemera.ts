import mod = require('modules/sample/module');

class Controller {
  static $inject = ['$scope', '$element'];
  constructor(private $scope, private $element: JQLite) {
    var canvas = $($element)
      .find('canvas')
      .get(0);

    $scope.vm = this;
    $scope.context = canvas['getContext']('2d');
    $scope.video = {};
  }

  capt() {
    this.$scope.context.drawImage(this.$scope.video.element, 0, 0, 640, 480);
  }
}

mod.controller('modules/sample/components/cemera', Controller);
