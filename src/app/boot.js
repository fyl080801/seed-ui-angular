define([
  'angular',
  'jquery',
  'bootstrap',
  'angular-ui-bootstrap-tpls',
  'angular-ui-router'
], function() {
  'use strict';

  return angular.module('app.boot', ['ui.router', 'ui.bootstrap']);
});
