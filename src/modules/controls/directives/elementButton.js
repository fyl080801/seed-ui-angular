/**
 * Created by fyl08 on 2017/1/17.
 */
define('modules.controls.directives.elementButton', [
    'modules.controls.module'
], function (module) {
    'use strict';

    module.directive('elementButton', [
        '$rootScope',
        function ($rootScope) {
            var _scope = {
                elementButton: '@',
                elementText: '@',
                elementSize: '@',
                elementIcon: '@',
                elementTooltip: '@'
            };

            var _template = '<button type="button" class="btn btn-{{elementButton}} btn-{{elementSize?elementSize:\'md\'}}"' +
                '       tooltip-append-to-body="true" tooltip="{{elementTooltip}}">' +
                '   <i ng-if="elementIcon" class="glyphicon {{elementIcon}}"></i>{{elementText?\'&nbsp;\':\'\'}}{{elementText}}' +
                '</button>';

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