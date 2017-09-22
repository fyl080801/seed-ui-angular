define([
    'app/directives'
], function (directives) {
    'use strict';

    directives.directive('title', [
        '$rootScope',
        '$timeout',
        function ($rootScope, $timeout) {
            var _link = function (scope, element, attrs) {
                $rootScope.$on('$stateChangeSuccess', function (event, toState) {
                    $timeout(function () {
                        document.title = (toState.data && toState.data.title) ?
                            toState.data.title : '';
                    });
                });
            };

            return {
                restrict: 'E',
                link: _link
            };
        }
    ]);
});