/**
 * Created by fyl08 on 2017/1/22.
 */
define('modules.controls.directives.exValuefield', [
    'require',
    'modules.controls',
    'modules.controls.directives.exField'
], function (require, controls, exField) {
    'use strict';

    controls.directive('exValuefield', [
        function () {
            var _scope = $.extend({
                exHidden: '@'
            }, exField.fieldScope);

            var _link = function ($scope, $element, $attrs, $ctrl) {
                $ctrl.$render = function () {
                    $element.find('p').empty();
                    $element.find('p').html($ctrl.$viewValue);
                };

                var formatter = function (value) {
                    return value ? value.toString().replace(/[\r\n]/g, '<br/>') : value;
                };

                $ctrl.$formatters.push(formatter);
                $ctrl.$parsers.push(formatter);
            };

            var _controller = function ($scope, $element, $attrs, $transclude) {

            };

            return $.extend({
                scope: _scope,
                link: _link,
                controller: ['$scope', '$element', '$attrs', _controller],
                templateUrl: 'templates/controls/ExValuefield.html'
            }, exField.directiveAttribute);
        }
    ]);
});