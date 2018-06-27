define(['app/boot'], function (boot) {
    'use strict';
    boot.directive('theme', [
        function () {
            var _link = function ($scope, $element, $attrs, $ctrl) { };
            var _controller = function ($scope, $element, $attrs, $appEnvironment) {
                $scope.$appEnvironment = $appEnvironment;
            };
            return {
                scope: {
                    normal: '@',
                    path: '@'
                },
                restrict: 'AE',
                replace: true,
                link: _link,
                controller: [
                    '$scope',
                    '$element',
                    '$attrs',
                    '$appEnvironment',
                    _controller
                ],
                template: '<link ng-href="{{path}}/{{$appEnvironment.theme?$appEnvironment.theme:normal}}.css" rel="stylesheet" />'
            };
        }
    ]);
});
//# sourceMappingURL=theme.js.map