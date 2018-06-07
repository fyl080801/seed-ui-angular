import boot = require('app/boot');

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
        resolve.$deps = [
          '$q',
          function($q) {
            var defer = $q.defer();
            require(typeof lazyArray === 'string'
              ? [lazyArray]
              : lazyArray, function() {
              defer.resolve(arguments);
            });
            return defer.promise;
          }
        ];
        config.resolve = resolve;
      }
      return stateFn(state, config);
    };
  }
]);
