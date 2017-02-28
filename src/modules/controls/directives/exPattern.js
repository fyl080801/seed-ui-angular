/**
 * Created by fyl08 on 2017/1/22.
 */
define('modules.controls.directives.exPattern', [
    'modules.controls.module',
    'modules.controls.directives.exField'
], function (module, exField) {
    'use strict';

    module.directive('exPattern', [
        function () {
            var _link = function ($scope, $element, $attrs, $ctrl) {
                if ($attrs.exPattern) {
                    var textRegexp = exField.textRegexps[$attrs.exPattern] ?
                        exField.textRegexps[$attrs.exPattern] : $attrs.exPattern;

                    var customValidator = function (value) {
                        var validity = $ctrl.$isEmpty(value) || textRegexp.test(value);
                        $ctrl.$setValidity($attrs.ngModel, validity);
                        return value;
                    };

                    $ctrl.$formatters.push(customValidator);
                    $ctrl.$parsers.push(customValidator);
                }
            };

            return $.extend({
                link: _link
            }, exField.bindAttribute);
        }
    ]);
});