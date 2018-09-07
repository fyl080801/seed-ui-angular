define(["require", "exports", "app/boot"], function (require, exports, boot) {
    "use strict";
    exports.__esModule = true;
    function directive($rootScope, $timeout) {
        function _link(scope, instanceElement, instanceAttributes) {
            $rootScope.$on('$stateChangeSuccess', function (event, toState) {
                $timeout(function () {
                    document.title =
                        toState.data && toState.data.title ? toState.data.title : '';
                });
            });
        }
        return {
            restrict: 'E',
            link: _link
        };
    }
    directive.$inject = ['$rootScope', '$timeout'];
    boot.directive('title', directive);
});
//# sourceMappingURL=title.js.map