/**
 * Created by fyl08 on 2016/12/26.
 */
define('app.configs.dependencyLoader', [
    'app.configs'
], function (configs) {
    'use strict';

    configs.config([
        '$stateProvider',
        function ($stateProvider) {
            var stateFn = $stateProvider.state;

            $stateProvider.state = function (state, config) {
                if (config.dependencies) {
                    var resolve = config.resolve || {};
                    resolve['$deps'] = resolveDependencies(config.dependencies);
                    config.resolve = resolve;
                }
                return stateFn(state, config);
            };

            function resolveDependencies(dependencies) {
                if (typeof(dependencies) === 'string') {
                    dependencies = [dependencies];
                }
                return ['$q', function ($q) {
                    var defer = $q.defer();
                    require(dependencies, function () {
                        defer.resolve(arguments);
                    });
                    return defer.promise;
                }];
            }
        }
    ]);
});