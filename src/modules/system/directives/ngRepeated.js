/**
 * Created by fyl08 on 2017/1/4.
 */
define('modules.system.directives.ngRepeated', [
    'modules.system.module'
], function (module) {
    'use strict';

    module.directive('ngRepeated', [
        function () {
            var _link = function (scope, element, attr) {
                if (scope.$last === true) {
                    eval(attr.ngRepeated);
                }
            };

            return {
                link: _link
            }
        }
    ]);
});