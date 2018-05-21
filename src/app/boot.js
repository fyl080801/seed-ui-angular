define([
  'angular',
  'jquery',
  'bootstrap',
  'ui-bootstrap-tpls',
  'angular-ui-router'
], function() {
  'use strict';

  return angular.module('app.boot', ['ui.router', 'ui.bootstrap']);
});
