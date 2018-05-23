import mod = require('modules/sample/module');

class HomeController {
  static $inject = ['$scope'];
  constructor(private $scope: ng.IScope) {
    $scope['text'] = 'aaaaaaa';
  }
}

mod.default.controller('modules/sample/components/home', HomeController);
