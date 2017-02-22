/**
 * Created by fyl08 on 2017/1/17.
 */
define('modules.controls.directives.elementAddon', [
    'require',
    'modules.controls'
], function (require, controls) {
    'use strict';

    controls.directive('elementAddon', [
        '$rootScope',
        function ($rootScope) {
            var _scope = {
                elementAddon: '@',
                elementText: '@',
                elementIcon: '@',
                elementTooltip: '@'
            };

            var _template = '<span class="{{elementAddon===\'button\'?\'input-group-btn\':\'input-group-addon\'}}">' +
                '   <i ng-if="elementAddon===\'icon\'" class="glyphicon {{elementIcon}}"></i>' +
                '   <button ng-if="elementAddon===\'button\'" class="btn btn-default"' +
                '           tooltip-append-to-body="true" tooltip="{{elementTooltip}}">' +
                '       <i ng-if="elementIcon" class="glyphicon {{elementIcon}}"></i>{{elementText?\'&nbsp;\':\'\'}}{{elementText}}' +
                '   </button>' +
                '</span>';

            var _link = function (scope, element, attrs, ctrl) {

            };

            return {
                restrict: 'A',
                replace: true,
                scope: _scope,
                template: _template,
                link: _link
            };
        }
    ]);
});