define([
    'modules/ngtable/module'
], function (module) {
    'use strict';

    module.directive('ngTableFilterRow', [
        function () {
            var directive = {
                restrict: 'E',
                replace: true,
                templateUrl: 'ng-table/filterRow.html',
                scope: true,
                controller: 'modules.ngtable.controllers.ngTableFilterRowController'
            };
            return directive;
        }
    ]);
});