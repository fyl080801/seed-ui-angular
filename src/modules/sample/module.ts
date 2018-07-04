import angular = require('angular');

class SampleModule {
  static $inject = ['$stateProvider', '$urlRouterProvider'];
  constructor(
    $stateProvider: app.configs.IRequireStateProvider,
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

    $urlRouterProvider.otherwise('/index');
  }
}

export = angular.module('modules.sample', []).config(SampleModule);
