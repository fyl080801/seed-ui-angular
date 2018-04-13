define(['modules/sample/module'], function(module) {
  'use strict';

  module.controller('modules.sample.controllers.test', [
    '$scope',
    function($scope) {
      $scope.text = 'zzxxx';

      $scope.testClick = function() {
        $('#aaa').slideUp(300);
      };
    }
  ]);
});
