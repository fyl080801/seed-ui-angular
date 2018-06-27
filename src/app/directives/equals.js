define(['app/boot'], function (boot) {
    'use strict';
    boot.directive('equals', [
        function () {
            function _link($scope, $element, $attrs, $ctrl) {
                function validator(inputValue) {
                    var valid = inputValue === $scope.$eval($attrs.equals);
                    $ctrl.$setValidity('equal', valid);
                    return valid ? inputValue : null;
                }
                $ctrl.$parsers.push(validator);
                $ctrl.$formatters.push(validator);
                $scope.$watch($attrs.equals, function () {
                    $ctrl.$setViewValue($ctrl.$viewValue);
                });
            }
            return {
                require: 'ngModel',
                link: _link
            };
        }
    ]);
});
//# sourceMappingURL=equals.js.map