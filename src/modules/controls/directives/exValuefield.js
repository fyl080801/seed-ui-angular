/**
 * Created by fyl08 on 2017/1/22.
 */
define('modules.controls.directives.exValuefield', [
    'modules.controls.module',
    'modules.controls.directives.exField'
], function (module, exField) {
    'use strict';

    module.directive('exValuefield', [
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