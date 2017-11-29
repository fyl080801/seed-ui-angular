define([
    'modules/ngtable/directives'
], function (module) {
    'use strict';

    module.directive('ngTablePagination', [
        '$compile',
        'modules.ngtable.factories.ngTableEventsChannel',
        function ($compile, ngTableEventsChannel) {
            'use strict';

            return {
                restrict: 'A',
                scope: {
                    'params': '=ngTablePagination',
                    'templateUrl': '='
                },
                replace: false,
                link: function (scope, element /*, attrs*/ ) {

                    ngTableEventsChannel.onAfterReloadData(function (pubParams) {
                        scope.pages = pubParams.generatePagesArray();
                    }, scope, function (pubParams) {
                        return pubParams === scope.params;
                    });

                    scope.$watch('templateUrl', function (templateUrl) {
                        if (angular.isUndefined(templateUrl)) {
                            return;
                        }
                        var template = angular.element(document.createElement('div'));
                        template.attr({
                            'ng-include': 'templateUrl'
                        });
                        element.append(template);
                        $compile(template)(scope);
                    });
                }
            };
        }
    ]);
});