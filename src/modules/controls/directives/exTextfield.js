/**
 * Created by fyl08 on 2017/1/22.
 */
define('modules.controls.directives.exTextfield', [
    'modules.controls.module',
    'modules.controls.directives.exField'
], function (module, exField) {
    'use strict';

    module.directive('exTextfield', [
        function () {
            var _scope = $.extend({
                exType: '@'
            }, exField.fieldScope, exField.inputFieldScope);

            var _link = function ($scope, $element, $attrs, $ctrl) {

            };

            var _controller = function ($scope, $element, $attrs) {

            };

            return $.extend({
                scope: _scope,
                link: _link,
                controller: ['$scope', '$element', '$attrs', _controller],
                templateUrl: 'templates/controls/ExTextfield.html'
            }, exField.directiveAttribute);
        }
    ]);
});