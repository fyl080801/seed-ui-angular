import mod = require('modules/sample/module');

class HomeController {
  static $inject = ['$scope', '$modal'];
  constructor(private $scope, private $modal: ng.ui.bootstrap.IModalService) {
    $scope.vm = this;
    $scope['text'] = 'aaaaaaa';
  }

  testmodal() {
    this.$modal.open({
      template: '<div>aaa</div>',
      windowClass: 'right',
      size: '7',
      backdrop: true
    });
  }
}

mod.controller('modules/sample/components/home', HomeController);
