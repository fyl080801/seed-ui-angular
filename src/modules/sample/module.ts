import angular = require('angular');

class SampleModule {
  static $inject = ['$stateProvider', '$urlRouterProvider'];
  constructor(
    $stateProvider: app.configs.IRequireStateProvider,
    $urlRouterProvider: ng.ui.IUrlRouterProvider
  ) {
    $stateProvider.state('home', {
      url: '/home',
      templateUrl: 'modules/sample/components/home.html',
      requires: ['modules/sample/requires']
    });

    $urlRouterProvider.otherwise('/home');
  }
}

export default angular.module('modules.sample', []).config(SampleModule);
