define(['app/boot'], function(boot) {
  'use strict';

  boot.run([
    '$rootScope',
    '$state',
    '$stateParams',
    function($rootScope, $state, $stateParams) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      $rootScope.$on('$stateChangeStart', function(
        event,
        toState,
        toParams,
        fromState,
        fromParams
      ) {});
      $rootScope.$on('$stateChangeSuccess', function(
        event,
        toState,
        toParams,
        fromState,
        fromParams
      ) {
        $rootScope.$previous = fromState;
        $rootScope.$previousParams = fromParams;
      });
      $state.back = function() {
        if ($rootScope.$previous)
          $state.go($rootScope.$previous.name, $rootScope.$previousParams);
      };
    }
  ]);
});
