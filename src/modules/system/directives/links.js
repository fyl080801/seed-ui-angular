/**
 * Created by fyl08 on 2017/2/21.
 */
define('modules.system.directives.links', [
    'modules.system'
], function (system) {
    'use strict';

    system.directive('sysLinks', [
        function () {
            var _link = function ($scope, $element, $attrs, $ctrl) {

            };

            var _controller = function ($scope, $element, $attrs) {

            };

            return {
                scope: {
                    sysLinks: '='
                },
                restrict: 'AE',
                replace: true,
                link: _link,
                controller: ['$scope', '$element', '$attrs', _controller],
                templateUrl: 'templates/controls/Links.html'
            };
        }
    ]);
});