define([
  'angular',
  'rcss',
  'jquery',
  'bootstrap',
  'angular-ui-bootstrap',
  'angular-ui-router',
  'angular-sanitize',
  'angular-cookies'
], function(angular) {
  'use strict';

  return angular.module('app.boot', ['ui.router', 'ui.bootstrap']);
});
