/**
 * Created by fyl08 on 2017/1/22.
 */
define('modules.controls.directives.exTextarea', [
    'require',
    'modules.controls',
    'modules.controls.directives.exField'
], function (require, controls, exField) {
    'use strict';

    controls.directive('exTextarea', [
        function () {
            var _scope = $.extend({
                exRows: '@'
            }, exField.fieldScope, exField.inputFieldScope);

            var _link = function ($scope, $element, $attrs, $ctrl) {

            };

            var _controller = function ($scope, $element, $attrs) {

            };

            return $.extend({
                scope: _scope,
                link: _link,
                controller: ['$scope', '$element', '$attrs', _controller],
                templateUrl: 'templates/controls/ExTextarea.html'
            }, exField.directiveAttribute);
        }
    ]);
});