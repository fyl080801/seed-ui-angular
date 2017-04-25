/**
 * Created by fyl08 on 2017/2/21.
 */
define('modules.system.directives.linkItem', [
    'modules.system.module'
], function (module) {
    'use strict';

    module.directive('sysLinkItem', [
        function () {
            var _link = function ($scope, $element, $attrs, $ctrl) {
                
            };

            var _controller = function ($scope, $element, $attrs) {

            };

            return {
                scope: {
                    sysLinkItem: '='
                },
                restrict: 'AE',
                replace: true,
                transclude: true,
                link: _link,
                controller: ['$scope', '$element', '$attrs', _controller],
                templateUrl: 'templates/controls/LinkItem.html'
            };
        }
    ]);
});