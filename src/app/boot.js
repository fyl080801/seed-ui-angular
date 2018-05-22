define([
  'angular',
  'jquery',
  'bootstrap',
  'angular-ui-bootstrap-tpls',
  'angular-ui-router',
  'angular-cookies'
], function(angular) {
  'use strict';

  return angular.module('app.boot', ['ui.router', 'ui.bootstrap']);
});
