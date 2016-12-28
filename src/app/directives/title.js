/**
 * Created by fyl08 on 2016/12/24.
 */
define('app.directives.title', [
    'require',
    'app.directives'
], function (require, directives) {
    'use strict';

    directives.directive('title',
        [
            '$rootScope',
            '$timeout',
            function ($rootScope, $timeout) {
                return {
                    restrict: 'E',
                    link: function (scope, element, attrs) {
                        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
                            $timeout(function () {
                                element.text((toState.data && toState.data.title)
                                    ? toState.data.title
                                    : '');
                            });
                        });
                    }
                };
            }
        ]
    );
});