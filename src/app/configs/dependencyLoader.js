define(['require', 'app/boot'], function(require, boot) {
  'use strict';

  boot.config([
    '$stateProvider',
    function($stateProvider) {
      var stateFn = $stateProvider.state;

      $stateProvider.state = function(state, config) {
        var lazyArray = config.requires
          ? config.requires
          : config.dependencies
            ? config.dependencies
            : [];
        if (lazyArray.length > 0) {
          var resolve = config.resolve || {};
          resolve.$deps = resolveDependencies(lazyArray);
          config.resolve = resolve;
        }
        return stateFn(state, config);
      };

      function resolveDependencies(dependencies) {
        if (typeof dependencies === 'string') {
          dependencies = [dependencies];
        }
        return [
          '$q',
          function($q) {
            var defer = $q.defer();
            require(dependencies, function() {
              defer.resolve(arguments);
            });
            return defer.promise;
          }
        ];
      }
    }
  ]);
});
