import angular = require('angular');

class SampleModule {
  static $inject = ['$stateProvider', '$urlRouterProvider'];
  constructor(
    $stateProvider: app.IRequireStateProvider,
    $urlRouterProvider: ng.ui.IUrlRouterProvider
  ) {
    $stateProvider.state('index', {
      url: '/index',
      templateUrl: 'modules/sample/views/index.html'
    });

    $stateProvider.state('home', {
      url: '/home',
      templateUrl: 'modules/sample/components/home.html',
      requires: ['modules/sample/requires']
    });

    $stateProvider.state('jexcel', {
      url: '/jexcel',
      templateUrl: 'modules/sample/components/jexcel.html',
      requires: ['modules/sample/requires']
    });

    $stateProvider.state('three', {
      url: '/three',
      templateUrl: 'modules/sample/components/threeDemo.html',
      requires: ['modules/sample/requires']
    });

    $stateProvider.state('webupload', {
      url: '/webupload',
      templateUrl: 'modules/sample/components/webupload.html',
      requires: ['modules/sample/requires']
    });

    $stateProvider.state('cemera', {
      url: '/cemera',
      templateUrl: 'modules/sample/components/cemera.html',
      requires: ['modules/sample/requires']
    });

    $stateProvider.state('test', {
      url: '/test',
      templateUrl: 'modules/sample/components/test.html',
      requires: ['modules/sample/requires']
    });

    $urlRouterProvider.otherwise('/index');
  }
}

angular.module('template/modal/window.html', []).run([
  '$templateCache',
  function($templateCache) {
    $templateCache.put(
      'template/modal/window.html',
      '<div tabindex="-1" role="dialog" class="modal fade" ng-class="{in: animate}" ng-style="{\'z-index\': 1050 + index*10, display: \'block\'}" ng-click="close($event)">\n' +
        '    <div class="modal-dialog modal-{{size}}"><div class="modal-content" modal-transclude></div></div>\n' +
        '</div>'
    );
  }
]);

export = angular.module('modules.sample', []).config(SampleModule);
