import 'angular';
// import application = require('../../../src/app/application');

import application = require('app/application');

'use strict';

let angular: ng.IAngularStatic = window['angular'];

application['requires'].push('modules.sample');

export default angular.module('modules.sample', []).config([
  '$stateProvider',
  '$urlRouterProvider',
  function(
    $stateProvider: app.configs.IRequireStateProvider, //app.IStateProvider,
    $urlRouterProvider: ng.ui.IUrlRouterProvider
  ) {
    $stateProvider.state('home', {
      url: '/home',
      templateUrl: 'modules/sample/components/home.html',
      requires: ['modules/sample/requires']
    });

    $urlRouterProvider.otherwise('/home');
  }
]);
