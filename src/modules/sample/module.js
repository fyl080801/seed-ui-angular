define(['app/application'], function(application) {
  'use strict';

  application.requires.push('modules.sample');

  return angular.module('modules.sample', ['ui.router']).config([
    '$urlRouterProvider',
    '$stateProvider',
    function($urlRouterProvider, $stateProvider) {
      $urlRouterProvider.otherwise('/test');

      $stateProvider.state('test', {
        url: '/test',
        templateUrl: 'modules/sample/views/Test.html',
        requires: ['modules/sample/requires']
      });
    }
  ]);
});
