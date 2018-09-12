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
      size: '8',
      backdrop: true
    });
  }

  fntest() {
    var fff = 1;

    function sss() {
      console.log(fff);
      var fff = 'asaa';
      console.log(fff);
      console.log(this.fff);
    }
    sss();
  }
}

mod.controller('modules/sample/components/home', HomeController);
