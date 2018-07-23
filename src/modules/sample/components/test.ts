import mod = require('modules/sample/module');

class HomeController {
  static $inject = ['$scope', '$element'];
  constructor(private $scope, private $element) {
    $scope.vm = this;
    $scope['text'] = 'aaaaaaa';

    $('a[data-toggle="tab"]').on('shown.bs.tab', e => {
      if ($(e.target).attr('href') !== '#home') {
        $('.fake-tab a[href="#home"]')
          .parent('li')
          .removeClass('active');
      } else {
        $('.fake-tab a[href="#home"]')
          .parent('li')
          .addClass('active');
      }
    });
  }

  aaa() {
    $('#mytabs a[href="#home"]')['tab']('show');
  }
}

mod.controller('modules/sample/components/test', HomeController);
