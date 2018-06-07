define(["require", "exports", "app/boot"], function (require, exports, boot) {
    "use strict";
    exports.__esModule = true;
    var RouteRun = (function () {
        function RouteRun($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) { });
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                $rootScope.$previous = fromState;
                $rootScope.$previousParams = fromParams;
            });
            $state.back = function () {
                if ($rootScope.$previous)
                    return $state.go($rootScope.$previous.name, $rootScope.$previousParams);
            };
        }
        return RouteRun;
    }());
    RouteRun.$inject = ['$rootScope', '$state', '$stateParams'];
    boot.run(RouteRun);
});
//# sourceMappingURL=route.js.map