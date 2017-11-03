define([
    'modules/ngtable/module'
], function (module) {
    'use strict';

    module.directive('ngTableSorterRow', [
        function ngTableSorterRow() {
            var directive = {
                restrict: 'E',
                replace: true,
                templateUrl: 'ng-table/sorterRow.html',
                scope: true,
                controller: 'modules.ngtable.controllers.ngTableSorterRowController'
            };
            return directive;
        }
    ]);
});