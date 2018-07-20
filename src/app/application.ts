import angular = require('angular');
import 'app/configs/appConfig';
import 'app/configs/dependencyLoader';
import 'app/configs/appEnvironment';
import 'app/configs/rootScope';
import 'app/configs/modal';
import 'app/configs/http';
import 'app/configs/route';
import 'app/factories/httpState';
import 'app/factories/httpDataHandler';
import 'app/factories/delayTimer';
import 'app/services/ajaxService';
import 'app/services/httpService';
import 'app/services/popupService';
import 'app/services/treeUtility';
import 'app/directives/title';
import 'app/directives/theme';
import 'app/directives/equals';

var application = angular.module('app.application', ['app.boot']);
var fn = angular.module;

angular.module = (name, requires, configFn) => {
  var app = fn(name, requires, configFn);
  app.config([
    '$controllerProvider',
    '$compileProvider',
    '$filterProvider',
    '$provide',
    function($controllerProvider, $compileProvider, $filterProvider, $provide) {
      app.controller = $controllerProvider.register;
      app.directive = $compileProvider.directive;
      app.filter = $filterProvider.register;
      app.factory = $provide.factory;
      app.service = $provide.service;
    }
  ]);

  var reqIdx = -1;
  for (var i = 0; i < application.requires.length; i++) {
    if (application.requires[i] === name) {
      reqIdx = i;
      break;
    }
  }
  if (name !== 'app.application' && reqIdx < 0) application.requires.push(name);

  return app;
};

export = application;
